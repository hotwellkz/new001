import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users } from 'lucide-react';
import clsx from 'clsx';

const menuItems = [
  { 
    path: '/transactions', 
    label: 'Транзакции',
    icon: LayoutDashboard 
  },
  { 
    path: '/clients', 
    label: 'Клиенты',
    icon: Users 
  }
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white border-r h-screen fixed left-0 top-0">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-emerald-600">Dashboard</h1>
      </div>
      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                clsx(
                  'flex items-center px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600',
                  isActive && 'bg-emerald-50 text-emerald-600'
                )
              }
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};