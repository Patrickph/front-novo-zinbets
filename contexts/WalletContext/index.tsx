'use client';
import React, { createContext, useContext, useEffect, useState } from "react";
import { WalletContextProviderProps, Balance, Bonus, Wallets } from "./types";
import { api } from "@/lib/api";
import { parseCookies } from "nookies";

interface WalletContextType {
  isLoading: boolean;
  wallet: Balance | null;
  bonus: Bonus | null;
  fetchBalance: () => void;
  fetchBonus: () => void;
  wallets: Wallets[] | null;
  fetchWallets: () => void;
}

export const WalletContext = createContext<WalletContextType>({} as WalletContextType)

export const WalletContextProvider = ({ children }: WalletContextProviderProps) => {
  const cookies = parseCookies()
  const [wallet, setWallet] = useState<Balance | null>(null);
  const [bonus, setBonus] = useState<Bonus | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [wallets, setWallets] = useState<Wallets[] | null>(null)

  const fetchBonus = async () => {
    await api.get('/wallet/bonus')
      .then(response => {
        setBonus(response.data)
      })
  }

  const fetchBalance = async () => {
    setIsLoading(true)
    if (cookies['bet.token']) {
      await api.get('/wallet/get-balance')
        .then(response => {
          setWallet({
            balance: response.data.balance / 100,
            bonus: response.data.bonus / 100
          })
        })
    }
    setIsLoading(false)
  }

  const fetchWallets = async () => {
    setIsLoading(true)
    await api.get('/wallet/get-wallets')
      .then(response => {
        setWallets(response.data)
      }).finally(() => {
        setIsLoading(false)
      })
  }


  useEffect(() => {
    fetchBalance()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      fetchBalance()
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <WalletContext.Provider value={{
      isLoading,
      wallet,
      bonus,
      fetchBalance,
      fetchBonus,
      wallets,
      fetchWallets,
    }}>
      {children}
    </WalletContext.Provider >
  )
};

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet está fora de ThemeProvider.')
  }
  return context
}