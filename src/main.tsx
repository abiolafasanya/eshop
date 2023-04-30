import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import './index.css'
import './styles/index.scss'
import CartProvider  from './context/CartProvider';
import { AppProvider } from './context/AppContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthProvider';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </AppProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
