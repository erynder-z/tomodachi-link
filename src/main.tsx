import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { AuthContextProvider } from './contexts/AuthContext';
import { InfoOverlayContextProvider } from './contexts/InfoOverlayContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <HashRouter>
            <AuthContextProvider>
                <InfoOverlayContextProvider>
                    <App />
                </InfoOverlayContextProvider>
            </AuthContextProvider>
        </HashRouter>
    </React.StrictMode>
);
