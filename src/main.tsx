import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import { ThemeProvider } from '@/components/ThemeProvider';

import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
