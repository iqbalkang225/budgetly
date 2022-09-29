import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.css';
import App from './App';
import TransactionProvider from './store/TransactionProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TransactionProvider>
      <App />
    </TransactionProvider>
  </React.StrictMode>
);


