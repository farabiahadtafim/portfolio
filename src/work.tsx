import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import WorkApp from './WorkApp';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WorkApp />
  </StrictMode>
);
