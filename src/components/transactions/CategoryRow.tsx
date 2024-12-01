import React from 'react';
import { CategoryCard } from './CategoryCard';
import { CategoryCardType } from '../../types';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface CategoryRowProps {
  title: string;
  categories: CategoryCardType[];
  onHistoryClick: (category: CategoryCardType) => void;
  onAddCategory?: () => void;
  rowNumber: number;
  isExpanded: boolean;
  onToggle: () => void;
  itemCount: number;
}

export const CategoryRow: React.FC<CategoryRowProps> = ({
  title,
  categories,
  onHistoryClick,
  rowNumber,
  isExpanded,
  onToggle,
  itemCount
}) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-2">
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-500" />
          )}
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <span className="text-sm text-gray-500">·</span>
          <span className="text-sm text-gray-500">{itemCount} элементов</span>
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4 pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onHistoryClick={() => onHistoryClick(category)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};