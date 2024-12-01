import React from 'react';
import { X } from 'lucide-react';
import { Client } from '../../types/client';

interface ClientFilesProps {
  client: Client;
  isOpen: boolean;
  onClose: () => void;
}

export const ClientFiles: React.FC<ClientFilesProps> = ({
  client,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">
            Файлы клиента: {client.lastName} {client.firstName}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          <div className="text-center text-gray-500 py-8">
            Функционал работы с файлами находится в разработке
          </div>
        </div>
      </div>
    </div>
  );
};