import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAICwewb9nIfENQH-gOJgkpQXZKBity9ck",
  authDomain: "accounting-c3c06.firebaseapp.com",
  projectId: "accounting-c3c06",
  storageBucket: "accounting-c3c06.firebasestorage.app",
  messagingSenderId: "670119019137",
  appId: "1:670119019137:web:f5c57a1a6f5ef05c720380"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);