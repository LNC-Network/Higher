"use client";

import { useState, useEffect } from "react";
import { ClientSafeProvider, getProviders, LiteralUnion, signIn, useSession } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";

export default function LoginPage() {
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null
  >(null);
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
        {Object.values(providers).map((provider: ClientSafeProvider) => (
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
