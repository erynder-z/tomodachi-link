import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { AuthContextProvider } from './contexts/AuthContext';
import { InfoOverlayContextProvider } from './contexts/InfoOverlayContext';
import { UserDataContextProvider } from './contexts/UserDataContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <HashRouter>
            <AuthContextProvider>
                <UserDataContextProvider>
                    <InfoOverlayContextProvider>
                        <App />
                    </InfoOverlayContextProvider>
                </UserDataContextProvider>
            </AuthContextProvider>
        </HashRouter>
    </React.StrictMode>
);
