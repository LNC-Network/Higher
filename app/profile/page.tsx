"use client"; // If using Next.js App Router
import ProfilePage from "./profile";
import LoginPage from "./login";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckAuthPage() {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    useEffect(() => {
        const token = localStorage.getItem("auth_token");
        setToken(token);
    }, [router]);

    if (token) {
        return <ProfilePage />;
    } else {
        // Not logged in → go to login
        return <LoginPage />;
    }
}
