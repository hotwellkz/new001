import React, { useState } from 'react';
import { X } from 'lucide-react';
import { NewClient } from '../../types';

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: NewClient;
  isEditMode: boolean;
  yearOptions: number[];
  onSave: () => void;
}

export const ClientModal: React.FC<ClientModalProps> = ({
  isOpen,
  onClose,
  client,
  isEditMode,
  yearOptions,
  onSave
}) => {
  const [formData, setFormData] = useState(client);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">
            {isEditMode ? 'Редактировать клиента' : 'Добавить клиента'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Фамилия
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Имя
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Номер клиента
            </label>
            <input
              type="text"
              value={formData.clientNumber}
              onChange={(e) => setFormData({ ...formData, clientNumber: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Адрес строительства
            </label>
            <input
              type="text"
              value={formData.constructionAddress}
              onChange={(e) => setFormData({ ...formData, constructionAddress: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Название объекта
            </label>
            <input
              type="text"
              value={formData.objectName}
              onChange={(e) => setFormData({ ...formData, objectName: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Статус
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="deposit">Задаток</option>
              <option value="building">Строим</option>
              <option value="built">Построено</option>
            </select>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Отмена
            </button>
            <button
              onClick={onSave}
              className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600"
            >
              {isEditMode ? 'Сохранить' : 'Добавить'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};