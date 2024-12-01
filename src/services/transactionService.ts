import { collection, addDoc, doc, updateDoc, runTransaction, Timestamp, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { CategoryCardType } from '../types';
import { Transaction } from '../types/transaction';
import { COLLECTIONS } from '../constants/firebase';

export const transferFunds = async (
  sourceCategory: CategoryCardType,
  targetCategory: CategoryCardType,
  amount: number,
  description: string
): Promise<void> => {
  try {
    await runTransaction(db, async (transaction) => {
      const sourceCategoryRef = doc(db, COLLECTIONS.CATEGORIES, sourceCategory.id);
      const targetCategoryRef = doc(db, COLLECTIONS.CATEGORIES, targetCategory.id);
      
      const sourceDoc = await transaction.get(sourceCategoryRef);
      const targetDoc = await transaction.get(targetCategoryRef);
      
      if (!sourceDoc.exists() || !targetDoc.exists()) {
        throw new Error('Одна из категорий не существует');
      }
      
      const sourceAmount = sourceDoc.data().amount;
      
      if (sourceAmount < amount) {
        throw new Error('Недостаточно средств для перевода');
      }
      
      transaction.update(sourceCategoryRef, {
        amount: sourceAmount - amount
      });
      
      transaction.update(targetCategoryRef, {
        amount: targetDoc.data().amount + amount
      });
      
      const timestamp = Timestamp.now();
      
      // Создаем транзакцию списания
      const debitTransaction = {
        categoryId: sourceCategory.id,
        type: 'debit',
        amount: -amount,
        description,
        timestamp,
        relatedCategoryId: targetCategory.id
      };
      
      // Создаем транзакцию зачисления
      const creditTransaction = {
        categoryId: targetCategory.id,
        type: 'credit',
        amount: amount,
        description,
        timestamp,
        relatedCategoryId: sourceCategory.id
      };
      
      const transactionsRef = collection(db, COLLECTIONS.TRANSACTIONS);
      transaction.set(doc(transactionsRef), debitTransaction);
      transaction.set(doc(transactionsRef), creditTransaction);
    });
  } catch (error) {
    console.error('Error transferring funds:', error);
    throw error;
  }
};

export const addWarehouseItem = async (
  title: string,
  initialAmount: number
): Promise<void> => {
  try {
    await addDoc(collection(db, COLLECTIONS.CATEGORIES), {
      title,
      amount: initialAmount,
      row: 4, // WAREHOUSE
      color: 'orange',
      iconName: 'Package',
      isVisible: true,
      createdAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error adding warehouse item:', error);
    throw error;
  }
};

export const getTransactionHistory = async (categoryId: string): Promise<Transaction[]> => {
  try {
    const q = query(
      collection(db, COLLECTIONS.TRANSACTIONS),
      where('categoryId', '==', categoryId),
      orderBy('timestamp', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp.toDate()
    })) as Transaction[];
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    throw error;
  }
};