import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CssBaseline } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId={process.env.clientId}>
      <CssBaseline />
      <App />
    </GoogleOAuthProvider>
  </BrowserRouter>
);
