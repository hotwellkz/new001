import React from 'react';

interface ClientSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const ClientSearchBar: React.FC<ClientSearchBarProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Поиск по имени, номеру, адресу или объекту..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
    />
  );
};