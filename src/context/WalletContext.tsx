"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  chain: string | null;
  setWalletStatus: (
    connected: boolean,
    address?: string,
    chain?: string
  ) => void;
  showWalletNotification: (message: string) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [chain, setChain] = useState<string | null>(null);

  const setWalletStatus = useCallback(
    (connected: boolean, addr?: string, chainName?: string) => {
      setIsConnected(connected);
      setAddress(addr || null);
      setChain(chainName || null);
    },
    []
  );

  const showWalletNotification = useCallback((message: string) => {
    console.log(`[Wallet Notification] ${message}`);
  }, []);

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        chain,
        setWalletStatus,
        showWalletNotification,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within WalletProvider");
  }
  return context;
}
