export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  timestamp: Date;
  categoryId: string;
  relatedCategoryId?: string;
}

export interface TransactionFormData {
  amount: string;
  description: string;
  type: 'credit' | 'debit';
  relatedCategoryId?: string;
}

export const initialTransactionFormData: TransactionFormData = {
  amount: '',
  description: '',
  type: 'credit'
};