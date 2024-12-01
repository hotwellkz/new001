import { useState, useEffect } from 'react';
import { Client } from '../types';
import { subscribeToClients } from '../services/clientService';

export const useClients = (filters?: {
  year?: number;
  status?: 'building' | 'deposit' | 'built';
}) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToClients(
      (updatedClients) => {
        setClients(updatedClients);
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      },
      filters
    );

    return () => unsubscribe();
  }, [filters?.year, filters?.status]);

  return { clients, loading, error };
};