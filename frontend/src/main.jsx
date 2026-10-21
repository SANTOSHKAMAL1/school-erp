import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

createRoot(document.getElementById('dc-root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
