
import { Auth0Provider } from "@auth0/auth0-react"; 
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Auth0Provider
    domain={process.env.REACT_APP_AUTH_DOMAIN}
    clientId={process.env.REACT_APP_CLIENT_ID}
    authorizationParams={{
      redirect_uri: process.env.REACT_APP_AUTH_REDIRECT_URI
    }}
  >
    <React.StrictMode>
      <App />

  </React.StrictMode >
  </Auth0Provider>,
);
