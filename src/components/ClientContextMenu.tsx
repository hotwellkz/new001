import React from 'react';
import { Edit, Trash2, CheckCircle, Clock, Building } from 'lucide-react';

interface ClientContextMenuProps {
  position: { x: number; y: number };
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (status: 'building' | 'deposit' | 'built') => void;
  clientName: string;
  currentStatus: string;
}

export const ClientContextMenu: React.FC<ClientContextMenuProps> = ({
  position,
  onClose,
  onEdit,
  onDelete,
  onStatusChange,
  clientName,
  currentStatus
}) => {
  React.useEffect(() => {
    const handleClickOutside = () => onClose();
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [onClose]);

  return (
    <div
      className="fixed bg-white rounded-lg shadow-lg py-2 z-50"
      style={{ top: position.y, left: position.x }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="px-4 py-2 text-sm font-medium text-gray-700 border-b">
        {clientName}
      </div>
      
      <button
        onClick={onEdit}
        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
      >
        <Edit className="w-4 h-4 mr-2" />
        Редактировать
      </button>
      
      <div className="border-t">
        <div className="px-4 py-2 text-xs font-medium text-gray-500">
          Изменить статус
        </div>
        <button
          onClick={() => onStatusChange('deposit')}
          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
          disabled={currentStatus === 'deposit'}
        >
          <Clock className="w-4 h-4 mr-2" />
          Задаток
        </button>
        <button
          onClick={() => onStatusChange('building')}
          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
          disabled={currentStatus === 'building'}
        >
          <Building className="w-4 h-4 mr-2" />
          Строим
        </button>
        <button
          onClick={() => onStatusChange('built')}
          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
          disabled={currentStatus === 'built'}
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Построено
        </button>
      </div>
      
      <div className="border-t">
        <button
          onClick={onDelete}
          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Удалить
        </button>
      </div>
    </div>
  );
};