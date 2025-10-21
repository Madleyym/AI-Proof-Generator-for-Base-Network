"use client";

import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

export function useWalletConnection() {
  const { isConnected, address, chain } = useAccount();
  const [walletConnected, setWalletConnected] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Set mounted flag for hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update wallet connection state
  useEffect(() => {
    if (mounted) {
      setWalletConnected(isConnected && !!address);
    }
  }, [isConnected, address, mounted]);

  return {
    walletConnected,
    address,
    chain,
    isConnected,
    mounted,
  };
}
