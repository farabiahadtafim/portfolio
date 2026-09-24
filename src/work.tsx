import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import WorkApp from './WorkApp';
import Loader from './components/Loader';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Loader>
      <WorkApp />
    </Loader>
  </StrictMode>
);
