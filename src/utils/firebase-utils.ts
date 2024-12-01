import { collection, query, where, getDocs, DocumentData, QuerySnapshot, writeBatch } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const getCollectionData = async <T extends DocumentData>(
  collectionName: string,
  constraints: any[] = []
): Promise<T[]> => {
  try {
    const q = query(collection(db, collectionName), ...constraints);
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as T[];
  } catch (error) {
    console.error(`Error fetching ${collectionName}:`, error);
    throw error;
  }
};

export const processQuerySnapshot = <T extends DocumentData>(
  snapshot: QuerySnapshot<DocumentData>
): T[] => {
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as T[];
};

export const checkDocumentExists = async (
  collectionName: string,
  field: string,
  value: string,
  excludeId?: string
): Promise<boolean> => {
  const q = query(
    collection(db, collectionName),
    where(field, '==', value)
  );
  
  const snapshot = await getDocs(q);
  
  if (excludeId) {
    return snapshot.docs.some(doc => doc.id !== excludeId);
  }
  
  return !snapshot.empty;
};

export const batchUpdate = async (
  updates: { ref: any; data: any }[]
): Promise<void> => {
  const batch = writeBatch(db);
  
  updates.forEach(({ ref, data }) => {
    batch.update(ref, data);
  });
  
  await batch.commit();
};