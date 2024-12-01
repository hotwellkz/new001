import { collection, query, onSnapshot, QueryConstraint, where, doc, updateDoc, writeBatch, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Client } from '../types';

export const subscribeToClients = (
  onUpdate: (clients: Client[]) => void,
  onError: (error: Error) => void,
  filters?: {
    year?: number;
    status?: 'building' | 'deposit' | 'built';
  }
) => {
  const constraints: QueryConstraint[] = [];
  
  if (filters?.year) {
    constraints.push(where('year', '==', filters.year));
  }
  
  if (filters?.status) {
    constraints.push(where('status', '==', filters.status));
  }

  const q = query(collection(db, 'clients'), ...constraints);

  return onSnapshot(
    q,
    (snapshot) => {
      const clients = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Client[];
      onUpdate(clients);
    },
    onError
  );
};

export const updateClientVisibility = async (client: Client, newVisibility: boolean) => {
  const batch = writeBatch(db);
  
  // Обновляем клиента
  const clientRef = doc(db, 'clients', client.id);
  batch.update(clientRef, { isIconsVisible: newVisibility });
  
  // Обновляем связанные категории
  const categoriesQuery = query(
    collection(db, 'categories'),
    where('clientId', '==', client.id)
  );
  
  const categoriesSnapshot = await getDocs(categoriesQuery);
  categoriesSnapshot.forEach((doc) => {
    batch.update(doc.ref, { isVisible: newVisibility });
  });
  
  await batch.commit();
};