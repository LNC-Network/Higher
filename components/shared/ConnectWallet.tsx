// 'use client';

// import React, {useEffect, useState} from 'react';
// import {ethers} from 'ethers';
// import {toast} from 'sonner';
// import {Button} from '../ui/button';
// import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
// import Image from 'next/image';
// import {useRouter} from 'next/navigation';

// const ConnectWallet: React.FC = () => {
//   const [account, setAccount] = useState<string | null>(null);
//   const [isConnecting, setIsConnecting] = useState<boolean>(false);
//   const router = useRouter();

//   const checkConnection = async () => {
//     if (typeof window === 'undefined' || !window.ethereum) return;
//     try {
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const currentAccounts = await provider.send('eth_accounts', []);
//       if (currentAccounts.length > 0) {
//         setAccount(currentAccounts[0]);
//       }
//     } catch (err) {
//       toast.error('Error connecting wallet');
//     }
//   };

//   useEffect(() => {
//     checkConnection();
//   }, []);

//   const connectWallet = async () => {
//     if (!window.ethereum) {
//       toast.warning('MetaMask not detected. Please install MetaMask.');
//       return;
//     }
//     if (isConnecting) return;
//     setIsConnecting(true);
//     try {
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const address = await signer.getAddress();

//       // Generate message to sign (can be dynamic, e.g., include a timestamp)
//       const message = `Sign this message to login at ${new Date().toISOString()}`;
//       const signature = await signer.signMessage(message);

//       // Send wallet data to our secure API route
//       const res = await fetch('/api/auth/wallet', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({address, message, signature}),
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         toast.error(data.error || 'Something went wrong');
//         return;
//       }

//       setAccount(address);
//       toast.success('Wallet connected and authenticated!');
//       router.push('/profile');
//     } catch (error: any) {
//       if (error.code === -32002) {
//         toast.warning('A connection request is already pending in MetaMask.');
//       } else {
//         toast.error('Failed to connect wallet');
//       }
//     } finally {
//       setIsConnecting(false);
//     }
//   };

//   if (!account) {
//     return (
//       <Button
//         className='bg-cyan-500 hover:bg-cyan-500 text-black font-semibold py-2 px-4 rounded hover:shadow-[0px_0px_15px_#06b6d4] transition-all duration-300'
//         onClick={connectWallet}
//         disabled={isConnecting}>
//         {isConnecting ? 'Connecting...' : 'Connect Wallet'}
//       </Button>
//     );
//   } else if (isConnecting) {
//     return (
//       <Image
//         onClick={() => router.push('/profile')}
//         src='/spinning-dots.svg'
//         height={50}
//         width={50}
//         alt='spinning svg'
//       />
//     );
//   } else {
//     return (
//       <Avatar
//         onClick={() => {
//           router.push(`/profile?walletId=${account}`);
//         }}
//         className='cursor-pointer w-10 h-10'>
//         <AvatarImage src='' alt='User Avatar' />
//         <AvatarFallback>{account.slice(2, 4).toUpperCase()}</AvatarFallback>
//       </Avatar>
//     );
//   }
// };

// export default ConnectWallet;


'use client';

import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ConnectWallet: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const router = useRouter();

  const checkConnection = async () => {
    if (typeof window === 'undefined' || !window.ethereum) return;
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_accounts', []);
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    } catch (err) {
      console.error('Error checking connection:', err);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const connectWallet = async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      toast.warning('MetaMask not detected. Please install MetaMask.');
      return;
    }
    
    if (isConnecting) return;
    setIsConnecting(true);
    
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      // This will prompt the user to connect if not connected
      const accounts = await provider.send('eth_requestAccounts', []);
      
      if (accounts.length === 0) {
        toast.error('No accounts found');
        return;
      }
      
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      // Generate message with nonce for security
      const nonce = Math.floor(Math.random() * 1000000).toString();
      const message = `Sign this message to login at ${new Date().toISOString()}. Nonce: ${nonce}`;
      const signature = await signer.signMessage(message);
      
      // Send wallet data to API route
      const res = await fetch('/api/auth/wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, message, signature, nonce }),
      });
      
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || 'Authentication failed');
        return;
      }
      
      setAccount(address);
      toast.success('Wallet connected and authenticated!');
      router.push('/profile');
    } catch (error: any) {
      console.error('Connection error:', error);
      if (error.code === -32002) {
        toast.warning('A connection request is already pending in MetaMask.');
      } else if (error.code === 4001) {
        toast.error('User rejected the connection request');
      } else {
        toast.error('Failed to connect wallet');
      }
    } finally {
      setIsConnecting(false);
    }
  };

  // Render loading state when connecting
  if (isConnecting) {
    return (
      <div className="flex items-center">
        <Image
          src='/spinning-dots.svg'
          height={50}
          width={50}
          alt='connecting wallet'
        />
      </div>
    );
  }

  // Not connected yet
  if (!account) {
    return (
      <Button
        className='bg-cyan-500 hover:bg-cyan-500 text-black font-semibold py-2 px-4 rounded hover:shadow-[0px_0px_15px_#06b6d4] transition-all duration-300'
        onClick={connectWallet}
        disabled={isConnecting}
      >
        Connect Wallet
      </Button>
    );
  }

  // Connected state
  return (
    <Avatar
      onClick={() => {
        router.push(`/profile?walletId=${account}`);
      }}
      className='cursor-pointer w-10 h-10'
    >
      <AvatarImage src='' alt='User Avatar' />
      <AvatarFallback>{account.slice(2, 4).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};

export default ConnectWallet;