"use client";

import { useState, useEffect } from "react";
import { getProviders, signIn, useSession } from "next-auth/react";

export default function LoginPage() {
  const [providers, setProviders] = useState<any>(null);
  const { data: session } = useSession();

  // Load available providers
  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  // Store token in localStorage after login
  useEffect(() => {
    if (session) {
      localStorage.setItem("auth_token", JSON.stringify(session));
      console.log("Session stored in localStorage");
    }
  }, [session]);

  if (!providers) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="">Loading providers...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center ">
      <div className="p-8  shadow rounded-xl text-center w-80">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        {Object.values(providers).map((provider: any) => (
          <div key={provider.name}>
            <button
              onClick={() => signIn(provider.id, { callbackUrl: "/profile" })}
              className="w-full py-3 px-4 bg-blue-600 rounded-lg shadow hover:bg-blue-700"
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
