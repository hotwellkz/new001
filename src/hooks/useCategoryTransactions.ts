import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  timestamp: Date;
  categoryId: string;
  relatedCategoryId?: string;
}

export const useCategoryTransactions = (categoryId: string) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const q = query(
      collection(db, 'transactions'),
      where('categoryId', '==', categoryId),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const transactionData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp.toDate(),
        })) as Transaction[];
        
        setTransactions(transactionData);
        
        // Вычисляем общую сумму
        const sum = transactionData.reduce((acc, curr) => acc + curr.amount, 0);
        setTotal(sum);
        
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching transactions:', error);
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [categoryId]);

  return { transactions, loading, error, total };
};