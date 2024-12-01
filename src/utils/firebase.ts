import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const checkClientExists = async (clientNumber: string, excludeId?: string) => {
  const q = query(
    collection(db, 'clients'),
    where('clientNumber', '==', clientNumber)
  );
  
  const snapshot = await getDocs(q);
  
  if (excludeId) {
    return snapshot.docs.some(doc => doc.id !== excludeId);
  }
  
  return !snapshot.empty;
};

export const getClientCategories = async (clientId: string) => {
  const q = query(
    collection(db, 'categories'),
    where('clientId', '==', clientId)
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};