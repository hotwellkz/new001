import { doc, deleteDoc, writeBatch, query, where, getDocs, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Client } from '../types';

export const deleteClientWithHistory = async (client: Client) => {
  const batch = writeBatch(db);
  
  // Удаляем клиента
  const clientRef = doc(db, 'clients', client.id);
  batch.delete(clientRef);
  
  // Удаляем связанные категории
  const categoriesQuery = query(
    collection(db, 'categories'),
    where('clientId', '==', client.id)
  );
  
  const categoriesSnapshot = await getDocs(categoriesQuery);
  categoriesSnapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });
  
  // Удаляем историю транзакций
  const transactionsQuery = query(
    collection(db, 'transactions'),
    where('clientId', '==', client.id)
  );
  
  const transactionsSnapshot = await getDocs(transactionsQuery);
  transactionsSnapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });
  
  await batch.commit();
};

export const deleteClientIconOnly = async (client: Client) => {
  const batch = writeBatch(db);
  
  // Обновляем клиента
  const clientRef = doc(db, 'clients', client.id);
  batch.update(clientRef, { isIconsVisible: false });
  
  // Скрываем связанные категории
  const categoriesQuery = query(
    collection(db, 'categories'),
    where('clientId', '==', client.id)
  );
  
  const categoriesSnapshot = await getDocs(categoriesQuery);
  categoriesSnapshot.forEach((doc) => {
    batch.update(doc.ref, { isVisible: false });
  });
  
  await batch.commit();
};