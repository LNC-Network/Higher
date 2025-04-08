import { NextRequest, NextResponse } from "next/server";
import { ethers } from "ethers";
import { supabaseAdmin } from "@/lib/supabaseServer";
import { createAuthToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    // Extract address, message, and signature from request body
    const { address, message, signature } = await req.json();

    if (!address || !message || !signature) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    // Verify the signature using ethers
    const recoveredAddress = ethers.verifyMessage(message, signature);
    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      return NextResponse.json({ error: "Signature verification failed" }, { status: 401 });
    }

    // Upsert the user's profile into the "profiles" table in Supabase
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .upsert(
        {
          id: address.toLowerCase(), // Using the wallet address as ID (or you can use a generated UUID)
          wallet_address: address.toLowerCase(), // Ensure consistency
          join_date: new Date().toISOString(),
        },
        { onConflict: "wallet_address" }
      )
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to upsert profile" }, { status: 500 });
    }

    // Create a session token (JWT) for persistent authentication
    const token = createAuthToken(address);

    const res = NextResponse.json({ profile: data }, { status: 200 });
    res.cookies.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
    });

    return res;
  } catch (err: any) {
    console.error("Error in wallet auth route:", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
