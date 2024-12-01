import { useState, useEffect } from 'react';
import { CategoryCardType } from '../types';
import { subscribeToCategories } from '../services/categoryService';

export const useCategories = (row?: number) => {
  const [categories, setCategories] = useState<CategoryCardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToCategories(
      (updatedCategories) => {
        setCategories(updatedCategories);
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      },
      row
    );

    return () => unsubscribe();
  }, [row]);

  return { categories, loading, error };
};