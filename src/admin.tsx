import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AdminDashboard from './pages/AdminDashboard';
import { PortfolioProvider } from './context/PortfolioContext';
import './index.css';

createRoot(document.getElementById('admin-root')!).render(
  <StrictMode>
    <PortfolioProvider>
      <AdminDashboard />
    </PortfolioProvider>
  </StrictMode>
);
