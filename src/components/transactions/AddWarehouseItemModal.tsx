import React, { useState } from 'react';
import { X } from 'lucide-react';
import { addWarehouseItem } from '../../services/transactionService';
import { showErrorNotification, showSuccessNotification } from '../../utils/notifications';

interface AddWarehouseItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddWarehouseItemModal: React.FC<AddWarehouseItemModalProps> = ({
  isOpen,
  onClose
}) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!title.trim()) {
      showErrorNotification('Введите название');
      return;
    }

    if (!amount || Number(amount) <= 0) {
      showErrorNotification('Введите корректную сумму');
      return;
    }

    try {
      setLoading(true);
      await addWarehouseItem(title.trim(), Number(amount));
      showSuccessNotification('Позиция успешно добавлена');
      onClose();
    } catch (error) {
      showErrorNotification('Ошибка при добавлении позиции');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Добавить позицию на склад</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Название
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Введите название"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Начальная сумма
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Введите сумму"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              disabled={loading}
            >
              Отмена
            </button>
            <button
              onClick={handleAdd}
              disabled={loading}
              className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 disabled:opacity-50"
            >
              {loading ? 'Добавление...' : 'Добавить'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};