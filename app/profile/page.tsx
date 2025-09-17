"use client";
import ProfilePage from "../../components/profile/profile";
import LoginPage from "../../components/profile/login";
import { useEffect, useState } from "react";

export default function CheckAuthPage() {
    const [token, setToken] = useState<string | null | undefined>(undefined);

    useEffect(() => {
        const savedToken = localStorage.getItem("auth_token");
        setToken(savedToken);
    }, []);

    if (token === undefined) {
        return null;
    }

    return token ? <ProfilePage /> : <LoginPage />;
}
