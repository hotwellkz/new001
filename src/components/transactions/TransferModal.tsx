import React, { useState } from 'react';
import { X } from 'lucide-react';
import { CategoryCardType } from '../../types';
import { transferFunds } from '../../services/transactionService';
import { showErrorNotification, showSuccessNotification } from '../../utils/notifications';

interface TransferModalProps {
  sourceCategory: CategoryCardType;
  targetCategory: CategoryCardType;
  isOpen: boolean;
  onClose: () => void;
}

export const TransferModal: React.FC<TransferModalProps> = ({
  sourceCategory,
  targetCategory,
  isOpen,
  onClose
}) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTransfer = async () => {
    if (!amount || Number(amount) <= 0) {
      showErrorNotification('Введите корректную сумму');
      return;
    }

    try {
      setLoading(true);
      await transferFunds(
        sourceCategory,
        targetCategory,
        Number(amount),
        description || 'Перевод средств'
      );
      showSuccessNotification('Средства успешно переведены');
      onClose();
    } catch (error) {
      showErrorNotification(error instanceof Error ? error.message : 'Ошибка при переводе средств');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Перевод средств</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <p className="text-sm text-gray-600">Из категории</p>
            <p className="font-medium">{sourceCategory.title}</p>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-600">В категорию</p>
            <p className="font-medium">{targetCategory.title}</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Сумма
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Введите сумму"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Описание
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Введите описание (необязательно)"
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
              onClick={handleTransfer}
              disabled={loading}
              className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 disabled:opacity-50"
            >
              {loading ? 'Выполняется...' : 'Перевести'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};