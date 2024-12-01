import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface DeleteClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeleteWithHistory: () => void;
  onDeleteIconOnly: () => void;
  clientName: string;
}

export const DeleteClientModal: React.FC<DeleteClientModalProps> = ({
  isOpen,
  onClose,
  onDeleteWithHistory,
  onDeleteIconOnly,
  clientName
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md mx-4">
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-lg font-medium text-gray-900">
              Удалить клиента
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Вы уверены, что хотите удалить клиента {clientName}?
            </p>
          </div>
          <div className="mt-6 space-y-2">
            <button
              onClick={onDeleteWithHistory}
              className="w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Удалить с историей
            </button>
            <button
              onClick={onDeleteIconOnly}
              className="w-full px-4 py-2 text-red-600 bg-red-50 rounded-md hover:bg-red-100"
            >
              Удалить только иконку
            </button>
            <button
              onClick={onClose}
              className="w-full px-4 py-2 text-gray-700 bg-white border rounded-md hover:bg-gray-50"
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};