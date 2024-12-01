import React from 'react';
import { Client } from '../../types/client';
import { Clock, Eye, EyeOff } from 'lucide-react';
import { formatCurrency } from '../../utils/formatting';

interface ClientListProps {
  clients: Client[];
  onContextMenu: (e: React.MouseEvent, client: Client) => void;
  onClientClick: (client: Client) => void;
  onToggleVisibility: (client: Client) => void;
  onViewHistory: (client: Client) => void;
  status: string;
}

export const ClientList: React.FC<ClientListProps> = ({
  clients,
  onContextMenu,
  onClientClick,
  onToggleVisibility,
  onViewHistory
}) => {
  if (clients.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Нет клиентов для отображения
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {clients.map((client) => (
        <div
          key={client.id}
          className="bg-white rounded-lg border-l-4 border-emerald-500 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onClientClick(client)}
          onContextMenu={(e) => onContextMenu(e, client)}
        >
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                {client.clientNumber.slice(0, 3)}
              </div>
              <div>
                <div className="font-medium">{client.lastName} {client.firstName}</div>
                <div className="text-sm text-gray-500">{client.clientNumber}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">{client.objectName || client.constructionAddress}</div>
                <div className="font-medium">{formatCurrency(client.balance || 0)}</div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewHistory(client);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <Clock className="w-5 h-5 text-gray-400" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleVisibility(client);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  {client.isIconsVisible ? (
                    <Eye className="w-5 h-5 text-gray-400" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {client.progress !== undefined && (
            <div className="px-4 pb-4">
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${client.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};