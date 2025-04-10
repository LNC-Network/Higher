'use client';

import React, {useEffect, useState} from 'react';
import {ethers} from 'ethers';
import {toast} from 'sonner';
import {Button} from '../ui/button';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import Image from 'next/image';
import {useRouter} from 'next/navigation';

const ConnectWallet: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const router = useRouter();

  const checkConnection = async () => {
    if (typeof window === 'undefined' || !window.ethereum) return;
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const currentAccounts = await provider.send('eth_accounts', []);
      if (currentAccounts.length > 0) {
        setAccount(currentAccounts[0]);
      }
    } catch (err) {
      toast.error('Error connecting wallet');
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.warning('MetaMask not detected. Please install MetaMask.');
      return;
    }
    if (isConnecting) return;
    setIsConnecting(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      // Generate message to sign (can be dynamic, e.g., include a timestamp)
      const message = `Sign this message to login at ${new Date().toISOString()}`;
      const signature = await signer.signMessage(message);

      // Send wallet data to our secure API route
      const res = await fetch('/api/auth/wallet', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({address, message, signature}),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || 'Something went wrong');
        return;
      }

      setAccount(address);
      toast.success('Wallet connected and authenticated!');
      router.push('/profile');
    } catch (error: any) {
      if (error.code === -32002) {
        toast.warning('A connection request is already pending in MetaMask.');
      } else {
        toast.error('Failed to connect wallet');
      }
    } finally {
      setIsConnecting(false);
    }
  };

  if (!account) {
    return (
      <Button
        className='bg-cyan-500 hover:bg-cyan-500 text-black font-semibold py-2 px-4 rounded hover:shadow-[0px_0px_15px_#06b6d4] transition-all duration-300'
        onClick={connectWallet}
        disabled={isConnecting}>
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </Button>
    );
  } else if (isConnecting) {
    return (
      <Image
        onClick={() => router.push('/profile')}
        src='/spinning-dots.svg'
        height={50}
        width={50}
        alt='spinning svg'
      />
    );
  } else {
    return (
      <Avatar
        onClick={() => {
          router.push(`/profile?walletId=${account}`);
        }}
        className='cursor-pointer w-10 h-10'>
        <AvatarImage src='' alt='User Avatar' />
        <AvatarFallback>{account.slice(2, 4).toUpperCase()}</AvatarFallback>
      </Avatar>
    );
  }
};

export default ConnectWallet;
