/* eslint-disable */
"use client";

import { useState, useEffect } from "react";

// Extend the Window interface to include the ethereum property

import { ethers } from "ethers";
import React from "react";
import { Button } from "./button";

const ConnectWallet: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);

  // Function to connect MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts: string[] = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]); // Save the connected wallet address
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("MetaMask not detected! Please install MetaMask.");
    }
  };

  // Check if user is already connected
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts: string[] = await provider.send("eth_accounts", []);
        if (accounts.length) {
          setAccount(accounts[0]);
        }
      }
    };
    checkWalletConnection();
  }, []);

  // Handle account and network changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        setAccount(accounts[0] || null);
      });
      window.ethereum.on("chainChanged", () => {
        window.location.reload(); // Reload page on network change
      });
    }
  }, []);

  return (
    <div className="flex gap-4">
      <Button onClick={connectWallet} className="hover:bg-black/80 hover:text-white border-2 border-black">
        {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
      </Button>
    </div>
  );
};

export default ConnectWallet;


// "use client";

// import { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import React from "react";
// import { Button } from "./button";
// import { Web3Storage } from "web3.storage";

// const ConnectWallet: React.FC = () => {
//   const [account, setAccount] = useState<string | null>(null);
//   const [file, setFile] = useState<File | null>(null);
//   const [ipfsUrl, setIpfsUrl] = useState<string | null>(null);

//   const API_TOKEN = "YOUR_WEB3_STORAGE_API_KEY"; // Replace with your Web3.Storage API key

//   // Connect MetaMask
//   const connectWallet = async () => {
//     if (window.ethereum) {
//       try {
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         const accounts: string[] = await window.ethereum.request({ method: "eth_requestAccounts" });
//         setAccount(accounts[0]);
//       } catch (error) {
//         console.error("Error connecting to MetaMask:", error);
//       }
//     } else {
//       alert("MetaMask not detected! Please install MetaMask.");
//     }
//   };

//   // Check wallet connection
//   useEffect(() => {
//     const checkWalletConnection = async () => {
//       if (window.ethereum) {
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         const accounts: string[] = await provider.send("eth_accounts", []);
//         if (accounts.length) {
//           setAccount(accounts[0]);
//         }
//       }
//     };
//     checkWalletConnection();
//   }, []);

//   // Handle MetaMask changes
//   useEffect(() => {
//     if (window.ethereum) {
//       window.ethereum.on("accountsChanged", (accounts: string[]) => {
//         setAccount(accounts[0] || null);
//       });
//       window.ethereum.on("chainChanged", () => {
//         window.location.reload();
//       });
//     }
//   }, []);

//   // Handle file selection
//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       setFile(event.target.files[0]);
//     }
//   };

//   // Upload file to IPFS
//   const uploadToIPFS = async () => {
//     if (!file) {
//       alert("Please select a file to upload.");
//       return;
//     }

//     const client = new Web3Storage({ token: API_TOKEN });
//     try {
//       const cid = await client.put([file]);
//       const url = `https://${cid}.ipfs.w3s.link/${file.name}`;
//       setIpfsUrl(url);
//       alert("File uploaded successfully!");
//     } catch (error) {
//       console.error("IPFS upload failed:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-4">
//       <Button onClick={connectWallet} className="hover:bg-black/80 hover:text-white border-2 border-black">
//         {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
//       </Button>

//       <input type="file" onChange={handleFileChange} className="border p-2" />
//       <Button onClick={uploadToIPFS} className="bg-blue-500 text-white p-2">
//         Upload to IPFS
//       </Button>

//       {ipfsUrl && (
//         <p>
//           File Uploaded: <a href={ipfsUrl} target="_blank" rel="noopener noreferrer">{ipfsUrl}</a>
//         </p>
//       )}
//     </div>
//   );
// };

// export default ConnectWallet;