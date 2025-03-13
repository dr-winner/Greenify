import { create } from 'zustand';
import { Transaction } from '../types';

interface TransactionState {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  getTransactionsByUser: (userId: string) => Transaction[];
  updateTransactionStatus: (transactionId: string, status: Transaction['status']) => void;
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  
  addTransaction: (transaction) => {
    set((state) => ({
      transactions: [...state.transactions, transaction]
    }));
  },
  
  getTransactionsByUser: (userId) => {
    const state = get();
    return state.transactions.filter(
      (t) => t.buyer_id === userId || t.seller_id === userId
    );
  },
  
  updateTransactionStatus: (transactionId, status) => {
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === transactionId ? { ...t, status } : t
      )
    }));
  }
}));