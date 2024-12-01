import React, { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { useClients } from '../hooks/useClients';
import { Client } from '../types';
import { ClientList } from '../components/clients/ClientList';
import { ClientModal } from '../components/clients/ClientModal';
import { ClientContextMenu } from '../components/ClientContextMenu';
import { DeleteClientModal } from '../components/modals/DeleteClientModal';
import { showErrorNotification } from '../utils/notifications';
import { formatCurrency } from '../utils/formatting';

export const Clients: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showAddModal, setShowAddModal] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState<'building' | 'deposit' | 'built' | 'all'>('all');

  const { clients, loading, totalBalance, totalExpenses } = useClients({
    year: selectedYear,
    status: status === 'all' ? undefined : status
  });

  const filteredClients = clients.filter(client => {
    const searchString = searchQuery.toLowerCase();
    return (
      client.lastName.toLowerCase().includes(searchString) ||
      client.firstName.toLowerCase().includes(searchString) ||
      client.clientNumber.toLowerCase().includes(searchString) ||
      client.constructionAddress.toLowerCase().includes(searchString) ||
      (client.objectName && client.objectName.toLowerCase().includes(searchString))
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <button onClick={() => window.history.back()} className="mr-4">
                  <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-2xl font-semibold">Клиенты</h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-gray-500">Баланс</div>
                  <div className="font-medium">{formatCurrency(totalBalance)}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Расходы</div>
                  <div className="font-medium">{formatCurrency(totalExpenses)}</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                >
                  {Array.from({ length: 5 }, (_, i) => selectedYear + i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                >
                  <option value="all">Все</option>
                  <option value="building">Строим</option>
                  <option value="deposit">Задаток</option>
                  <option value="built">Построено</option>
                </select>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600"
              >
                <Plus className="w-5 h-5 mr-1" />
                Добавить клиента
              </button>
            </div>
            
            <div className="mt-4">
              <input
                type="text"
                placeholder="Поиск по ФИО, номеру клиента, адресу или названию объекта..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
          </div>
        ) : (
          <ClientList
            clients={filteredClients}
            onContextMenu={(e, client) => {
              e.preventDefault();
              setContextMenuPosition({ x: e.clientX, y: e.clientY });
              setSelectedClient(client);
              setShowContextMenu(true);
            }}
            onClientClick={() => {}}
            onToggleVisibility={() => {}}
            onViewHistory={() => {}}
            status={status}
          />
        )}
      </div>

      {/* Модальные окна */}
      {showContextMenu && selectedClient && (
        <ClientContextMenu
          position={contextMenuPosition}
          onClose={() => setShowContextMenu(false)}
          onEdit={() => {}}
          onDelete={() => setShowDeleteModal(true)}
          onStatusChange={() => {}}
          clientName={`${selectedClient.lastName} ${selectedClient.firstName}`}
          currentStatus={selectedClient.status}
        />
      )}

      {showAddModal && (
        <ClientModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          client={initialClientState}
          isEditMode={false}
          yearOptions={Array.from({ length: 5 }, (_, i) => selectedYear + i)}
          onSave={() => setShowAddModal(false)}
        />
      )}

      {showDeleteModal && selectedClient && (
        <DeleteClientModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onDeleteWithHistory={() => {}}
          onDeleteIconOnly={() => {}}
          clientName={`${selectedClient.lastName} ${selectedClient.firstName}`}
        />
      )}
    </div>
  );
};