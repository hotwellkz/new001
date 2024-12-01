import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Client } from '../../types/client';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { showErrorNotification, showSuccessNotification } from '../../utils/notifications';
import { ClientStatusBadge } from './ClientStatusBadge';

interface ClientDetailsProps {
  client: Client;
  onSave: () => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

export const ClientDetails = forwardRef<{ handleSave: () => Promise<void> }, ClientDetailsProps>(
  ({ client, onSave, isEditing, setIsEditing }, ref) => {
    const [formData, setFormData] = useState(client);

    const handleSave = async () => {
      try {
        const clientRef = doc(db, 'clients', client.id);
        await updateDoc(clientRef, formData);
        showSuccessNotification('Данные клиента обновлены');
        setIsEditing(false);
        onSave();
      } catch (error) {
        showErrorNotification('Ошибка при обновлении данных клиента');
        throw error;
      }
    };

    useImperativeHandle(ref, () => ({
      handleSave
    }));

    if (!isEditing) {
      return (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Номер клиента</dt>
                  <dd className="mt-1 text-sm text-gray-900">{client.clientNumber}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Статус</dt>
                  <dd className="mt-1">
                    <ClientStatusBadge status={client.status} />
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Адрес строительства</dt>
                  <dd className="mt-1 text-sm text-gray-900">{client.constructionAddress}</dd>
                </div>
                {client.objectName && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Название объекта</dt>
                    <dd className="mt-1 text-sm text-gray-900">{client.objectName}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Фамилия</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Имя</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Номер клиента</label>
                <input
                  type="text"
                  value={formData.clientNumber}
                  onChange={(e) => setFormData({ ...formData, clientNumber: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Статус</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                >
                  <option value="deposit">Задаток</option>
                  <option value="building">Строим</option>
                  <option value="built">Построено</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Адрес строительства</label>
                <input
                  type="text"
                  value={formData.constructionAddress}
                  onChange={(e) => setFormData({ ...formData, constructionAddress: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Название объекта</label>
                <input
                  type="text"
                  value={formData.objectName}
                  onChange={(e) => setFormData({ ...formData, objectName: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ClientDetails.displayName = 'ClientDetails';