import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const useTransactionCategories = (categoryIds: string[]) => {
  const [categories, setCategories] = useState<Record<string, { title: string }>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      if (categoryIds.length === 0) {
        setCategories({});
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, 'categories'),
          where('__name__', 'in', categoryIds)
        );
        
        const snapshot = await getDocs(q);
        const categoriesData: Record<string, { title: string }> = {};
        
        snapshot.forEach((doc) => {
          categoriesData[doc.id] = { title: doc.data().title };
        });
        
        setCategories(categoriesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError(error instanceof Error ? error.message : 'Ошибка при загрузке категорий');
        setLoading(false);
      }
    };

    fetchCategories();
  }, [categoryIds]);

  return { categories, loading, error };
};