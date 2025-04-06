import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { toast } from "sonner";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ConnectWallet: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  const router = useRouter();

  const checkConnection = async () => {
    if (typeof window === "undefined" || !window.ethereum) return;

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const currentAccounts = await provider.send("eth_accounts", []);
      if (currentAccounts.length > 0) {
        setAccount(currentAccounts[0]);
      }
    } catch (err) {
      console.error("Error checking wallet connection:", err);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.warning("MetaMask not detected. Please install MetaMask.");
      return;
    }

    if (isConnecting) return;

    setIsConnecting(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const currentAccounts = await provider.send("eth_accounts", []);

      if (currentAccounts.length > 0) {
        setAccount(currentAccounts[0]);
      } else {
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
        toast.success("Connected to MetaMask successfully");
      }
    } catch (error: any) {
      if (error.code === -32002) {
        toast.warning("A connection request is already pending. Please complete it in MetaMask.");
      } else {
        console.error("Error connecting to MetaMask:", error);
      }
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div>
      {account ? (
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>{account.slice(2, 4).toUpperCase()}</AvatarFallback>
        </Avatar>
      ) : isConnecting ? (
        <Image onClick={() => router.push("/profile")} src="/spinning-dots.svg" height={50} width={50} alt="spinning svg" />
      ) : (
        <Button
          className="bg-cyan-500 hover:bg-cyan-500 text-black font-semibold py-2 px-4 rounded 
              hover:shadow-[0px_0px_15px_#06b6d4] 
             transition-all duration-300"
          onClick={connectWallet}
          disabled={isConnecting}
        >
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      )}
    </div>
  );
};

export default ConnectWallet;
