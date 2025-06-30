import React, { createContext, useContext, useState, useEffect } from 'react';

const WalletContext = createContext();

const API_BASE = 'http://192.168.0.106:3000/api';

export const WalletProvider = ({ children }) => {
  const [coins, setCoins] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const fetchWallet = async () => {
  try {
    const res = await fetch(`${API_BASE}/wallet`);
    const data = await res.json();
    console.log('Wallet fetched:', data); // ✅ Add this line
    setCoins(data.totalCoins);
    setTransactions(data.transactionHistory);
  } catch (err) {
    console.error('Failed to fetch wallet:', err);
  }
};

  const addCoins = async (amount) => {
    await fetch(`${API_BASE}/wallet/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });
    fetchWallet();
  };

  const deductCoins = async (amount) => {
    const res = await fetch(`${API_BASE}/wallet/deduct`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });

    if (!res.ok) throw new Error((await res.json()).message);

    fetchWallet();
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  return (
    <WalletContext.Provider value={{ coins, transactions, addCoins, deductCoins }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
