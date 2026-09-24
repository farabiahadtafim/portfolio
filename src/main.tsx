import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Loader from './components/Loader';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Loader>
      <App />
    </Loader>
  </StrictMode>
);
