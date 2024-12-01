import React, { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { CategoryRow } from '../components/transactions/CategoryRow';
import { useCategories } from '../hooks/useCategories';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { CategoryCardType } from '../types';
import { TransactionHistory } from '../components/transactions/TransactionHistory';
import { TransferModal } from '../components/transactions/TransferModal';
import { formatCurrency } from '../utils/formatting';

export const Transactions: React.FC = () => {
  const { categories, loading, error, totalBalance, totalExpenses } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<CategoryCardType | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferData, setTransferData] = useState<{
    sourceCategory: CategoryCardType;
    targetCategory: CategoryCardType;
  } | null>(null);
  const [expandedSections, setExpandedSections] = useState({
    clients: true,
    employees: true,
    projects: true,
    warehouse: true
  });

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const sourceCategory = active.data.current as CategoryCardType;
      const targetCategory = categories.find(c => c.id === over.id);
      
      if (targetCategory) {
        setTransferData({
          sourceCategory,
          targetCategory
        });
        setShowTransferModal(true);
      }
    }
  };

  const handleHistoryClick = (category: CategoryCardType) => {
    setSelectedCategory(category);
    setShowHistory(true);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-xl text-red-500 p-4 bg-white rounded-lg shadow">
          {error}
        </div>
      </div>
    );
  }

  const visibleCategories = categories.filter(c => c.isVisible !== false);
  const clientCategories = visibleCategories.filter(c => c.row === 1);
  const employeeCategories = visibleCategories.filter(c => c.row === 2);
  const projectCategories = visibleCategories.filter(c => c.row === 3);
  const warehouseCategories = visibleCategories.filter(c => c.row === 4);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="text-center">
              <div className="text-sm text-gray-500">Баланс</div>
              <div className="text-2xl font-semibold">{formatCurrency(totalBalance)}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Расходы</div>
              <div className="text-2xl font-semibold">{formatCurrency(totalExpenses)}</div>
            </div>
          </div>

          <div className="space-y-4">
            <CategoryRow
              title="Клиенты"
              categories={clientCategories}
              onHistoryClick={handleHistoryClick}
              rowNumber={1}
              isExpanded={expandedSections.clients}
              onToggle={() => setExpandedSections(prev => ({ ...prev, clients: !prev.clients }))}
              itemCount={clientCategories.length}
            />
            
            <CategoryRow
              title="Сотрудники"
              categories={employeeCategories}
              onHistoryClick={handleHistoryClick}
              rowNumber={2}
              isExpanded={expandedSections.employees}
              onToggle={() => setExpandedSections(prev => ({ ...prev, employees: !prev.employees }))}
              itemCount={employeeCategories.length}
            />
            
            <CategoryRow
              title="Проекты"
              categories={projectCategories}
              onHistoryClick={handleHistoryClick}
              rowNumber={3}
              isExpanded={expandedSections.projects}
              onToggle={() => setExpandedSections(prev => ({ ...prev, projects: !prev.projects }))}
              itemCount={projectCategories.length}
            />
            
            <CategoryRow
              title="Склад"
              categories={warehouseCategories}
              onHistoryClick={handleHistoryClick}
              rowNumber={4}
              isExpanded={expandedSections.warehouse}
              onToggle={() => setExpandedSections(prev => ({ ...prev, warehouse: !prev.warehouse }))}
              itemCount={warehouseCategories.length}
            />
          </div>
        </div>

        {showHistory && selectedCategory && (
          <TransactionHistory
            category={selectedCategory}
            isOpen={showHistory}
            onClose={() => setShowHistory(false)}
          />
        )}

        {showTransferModal && transferData && (
          <TransferModal
            sourceCategory={transferData.sourceCategory}
            targetCategory={transferData.targetCategory}
            isOpen={showTransferModal}
            onClose={() => {
              setShowTransferModal(false);
              setTransferData(null);
            }}
          />
        )}
      </div>
    </DndContext>
  );
};