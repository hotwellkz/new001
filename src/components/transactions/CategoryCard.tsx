import React from 'react';
import { Clock } from 'lucide-react';
import { CategoryCardType } from '../../types';
import { useDraggable } from '@dnd-kit/core';
import { formatCurrency } from '../../utils/formatting';

interface CategoryCardProps {
  category: CategoryCardType;
  onHistoryClick: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onHistoryClick }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: category.id,
    data: category
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const getIconColor = () => {
    switch (category.row) {
      case 1: return 'bg-yellow-500'; // Клиенты
      case 2: return 'bg-blue-500';   // Сотрудники
      case 3: return 'bg-blue-500';   // Проекты
      case 4: return 'bg-purple-500'; // Склад
      default: return 'bg-gray-500';
    }
  };

  const getAmountColor = () => {
    return category.amount < 0 ? 'text-red-600' : 'text-green-600';
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded-lg p-4 cursor-move hover:shadow-md transition-shadow border"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full ${getIconColor()} flex items-center justify-center text-white font-medium`}>
            {category.title.substring(0, 2)}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onHistoryClick();
            }}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <Clock className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
      <div className="text-sm font-medium text-gray-900 mb-1 truncate">
        {category.title}
      </div>
      <div className={`text-lg font-semibold ${getAmountColor()}`}>
        {formatCurrency(category.amount)}
      </div>
    </div>
  );
};