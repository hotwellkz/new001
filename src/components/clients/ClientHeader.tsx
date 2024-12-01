import React from 'react';
import { ArrowLeft, Save, Edit, Folder } from 'lucide-react';
import { Client } from '../../types/client';

interface ClientHeaderProps {
  client: Client;
  onBack: () => void;
  onSave: () => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  loading: boolean;
  handleSave: () => void;
  onFilesClick: () => void;
}

export const ClientHeader: React.FC<ClientHeaderProps> = ({
  client,
  onBack,
  isEditing,
  setIsEditing,
  loading,
  handleSave,
  onFilesClick
}) => {
  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={onBack} className="mr-4">
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <h1 className="text-2xl font-semibold text-gray-900">
                {client.lastName} {client.firstName}
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={onFilesClick}
                className="inline-flex items-center px-4 py-2 text-gray-700 bg-white border rounded-md hover:bg-gray-50"
              >
                <Folder className="w-5 h-5 mr-2" />
                Файлы
              </button>
              {isEditing ? (
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 disabled:opacity-50"
                >
                  <Save className="w-5 h-5 mr-2" />
                  {loading ? 'Сохранение...' : 'Сохранить'}
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600"
                >
                  <Edit className="w-5 h-5 mr-2" />
                  Редактировать
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};