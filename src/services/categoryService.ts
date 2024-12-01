import { collection, query, onSnapshot, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { CategoryCardType } from '../types';

export const subscribeToCategories = (
  onUpdate: (categories: CategoryCardType[]) => void,
  onError: (error: Error) => void,
  row?: number
) => {
  const constraints = [];
  
  if (row !== undefined) {
    constraints.push(where('row', '==', row));
  }

  const q = query(collection(db, 'categories'), ...constraints);

  return onSnapshot(
    q,
    (snapshot) => {
      const categories = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as CategoryCardType[];
      onUpdate(categories);
    },
    onError
  );
};