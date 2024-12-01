import React, { useMemo } from 'react';
import { X } from 'lucide-react';
import { CategoryCardType } from '../../types';
import { useTransactions } from '../../hooks/useTransactions';
import { useTransactionCategories } from '../../hooks/useTransactionCategories';
import { TransactionList } from './TransactionList';
import { LoadingSpinner } from '../LoadingSpinner';

interface TransactionHistoryProps {
  category: CategoryCardType;
  isOpen: boolean;
  onClose: () => void;
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  category,
  isOpen,
  onClose
}) => {
  const { transactions, loading: transactionsLoading, error } = useTransactions(category.id);
  
  const relatedCategoryIds = useMemo(() => 
    transactions
      .map(t => t.relatedCategoryId)
      .filter((id): id is string => id !== undefined),
    [transactions]
  );
  
  const { categories: relatedCategories, loading: categoriesLoading } = 
    useTransactionCategories(relatedCategoryIds);

  if (!isOpen) return null;

  const loading = transactionsLoading || categoriesLoading;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">История транзакций: {category.title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 max-h-[70vh] overflow-y-auto">
          {loading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              Ошибка при загрузке транзакций: {error}
            </div>
          ) : (
            <TransactionList
              transactions={transactions}
              relatedCategories={relatedCategories}
            />
          )}
        </div>
      </div>
    </div>
  );
};