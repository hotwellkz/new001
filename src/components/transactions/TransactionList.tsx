import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Transaction } from '../../types/transaction';
import { formatCurrency, formatDate } from '../../utils/formatting';

interface TransactionListProps {
  transactions: Transaction[];
  relatedCategories: Record<string, { title: string }>;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  relatedCategories
}) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        История транзакций пуста
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="bg-white p-4 rounded-lg shadow-sm border flex items-center justify-between"
        >
          <div className="flex-1">
            <div className="flex items-center">
              <span className="text-sm text-gray-600">
                {formatDate(transaction.timestamp)}
              </span>
              {transaction.relatedCategoryId && (
                <>
                  <ArrowRight className="w-4 h-4 mx-2 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {relatedCategories[transaction.relatedCategoryId]?.title || 'Неизвестная категория'}
                  </span>
                </>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-900">{transaction.description}</p>
          </div>
          <div className={`font-medium ${
            transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
          }`}>
            {transaction.type === 'credit' ? '+' : '-'}
            {formatCurrency(Math.abs(transaction.amount))}
          </div>
        </div>
      ))}
    </div>
  );
};