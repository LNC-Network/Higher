import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseServer";
import { verifyAuthToken } from "@/lib/auth";
import type { UserData, Article } from "@/types/profile";

export async function GET(req: NextRequest) {
  try {
    // Get the session token from cookies
    const sessionToken = req.cookies.get("session")?.value;

    // Check if this is a request for a specific profile by username or address
    const { searchParams } = new URL(req.url);
    const requestedUsername = searchParams.get("username");
    const requestedAddress = searchParams.get("address");

    let walletAddress = null;
    let isOwnProfile = false;

    // First, check if there's a session token to identify the logged-in user
    if (sessionToken) {
      walletAddress = verifyAuthToken(sessionToken);
      // If we have a valid token but are requesting someone else's profile
      if (walletAddress && (requestedUsername || requestedAddress)) {
        isOwnProfile = false;
        if (requestedAddress) {
          walletAddress = requestedAddress.toLowerCase();
        }
      } else if (walletAddress) {
        // We're looking at our own profile
        isOwnProfile = true;
      }
    } else if (requestedUsername || requestedAddress) {
      // No session but requesting a specific profile
      isOwnProfile = false;
      if (requestedAddress) {
        walletAddress = requestedAddress.toLowerCase();
      }
    } else {
      // No session and no specific profile requested
      return NextResponse.json({ authenticated: false, error: "Authentication required" }, { status: 401 });
    }

    // Query condition to find the profile
    let query = supabaseAdmin.from("profiles").select(`
      id,
      name,
      username,
      avatar_url,
      bio,
      followers,
      following,
      location,
      email,
      website,
      join_date,
      wallet_address,
      ens_name,
      token_balance,
      nft_count,
      verification_badge
    `);

    // Apply the appropriate filter based on what was provided
    if (requestedUsername) {
      query = query.eq("username", requestedUsername);
    } else if (walletAddress) {
      query = query.eq("wallet_address", walletAddress);
    }

    const { data: userData, error: userError } = await query.single();

    if (userError || !userData) {
      console.error("Profile fetch error:", userError);
      return NextResponse.json({ error: "User profile not found" }, { status: 404 });
    }

    // Fetch user's articles
    const { data: articlesData, error: articlesError } = await supabaseAdmin
      .from("articles")
      .select(
        `
        id,
        title,
        description,
        published_at,
        read_time,
        stars,
        tags,
        cover_image,
        token_gated,
        blockchain,
        token_reward,
        nft_required
      `
      )
      .eq("author_id", userData.id)
      .order("published_at", { ascending: false });

    if (articlesError) {
      console.error("Articles fetch error:", articlesError);
      // Continue even if articles fetch fails
    }

    // Transform from snake_case database fields to camelCase for the frontend
    const profile: UserData = {
      name: userData.name || "",
      username: userData.username || "",
      avatarUrl: userData.avatar_url,
      bio: userData.bio || "",
      followers: userData.followers || 0,
      following: userData.following || 0,
      location: userData.location || "",
      email: userData.email || "",
      website: userData.website || "",
      joinDate: userData.join_date ? new Date(userData.join_date).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "April 2023",
      walletAddress: userData.wallet_address,
      ensName: userData.ens_name || null,
      tokenBalance: userData.token_balance || 0,
      nftCount: userData.nft_count || 0,
      verificationBadge: userData.verification_badge || false,
    };

    // Transform articles data to match the frontend format
    const articles: Article[] = articlesData
      ? articlesData.map((article) => ({
          id: article.id,
          title: article.title,
          description: article.description,
          publishedAt: article.published_at ? new Date(article.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "January 1, 2025",
          readTime: article.read_time,
          stars: article.stars,
          tags: Array.isArray(article.tags) ? article.tags : [],
          coverImage: article.cover_image,
          tokenGated: article.token_gated || false,
          blockchain: article.blockchain || "",
          tokenReward: article.token_reward || 0,
          nftRequired: article.nft_required || undefined,
        }))
      : [];

    // Return the profile data
    return NextResponse.json(
      {
        authenticated: !!sessionToken && isOwnProfile,
        isOwnProfile,
        profile,
        articles,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error in GET profile route:", err);
    return NextResponse.json(
      {
        error: err.message || "Internal server error",
        authenticated: false,
      },
      { status: 500 }
    );
  }
}
