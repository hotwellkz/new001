import React from 'react';
import { formatClientStatus } from '../../utils/formatting';

interface ClientStatusBadgeProps {
  status: 'building' | 'deposit' | 'built';
}

export const ClientStatusBadge: React.FC<ClientStatusBadgeProps> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'building':
        return 'bg-green-100 text-green-800';
      case 'deposit':
        return 'bg-yellow-100 text-yellow-800';
      case 'built':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor()}`}>
      {formatClientStatus(status)}
    </span>
  );
};