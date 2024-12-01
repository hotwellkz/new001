import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/layout/Layout';
import { Transactions } from './pages/Transactions';
import { Clients } from './pages/Clients';

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/transactions" replace />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="clients" element={<Clients />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;