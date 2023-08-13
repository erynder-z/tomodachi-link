import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { AuthContextProvider } from './contexts/AuthContext';
import { InfoCardContextProvider } from './contexts/InfoCardContext';
import { CurrentUserDataContextProvider } from './contexts/CurrentUserDataContext';
import './index.css';
import { FriendDataContextProvider } from './contexts/FriendDataContext';
import { ThemeContextProvider } from './contexts/ThemeContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <HashRouter>
            <AuthContextProvider>
                <CurrentUserDataContextProvider>
                    <FriendDataContextProvider>
                        <InfoCardContextProvider>
                            <ThemeContextProvider>
                                <App />
                            </ThemeContextProvider>
                        </InfoCardContextProvider>
                    </FriendDataContextProvider>
                </CurrentUserDataContextProvider>
            </AuthContextProvider>
        </HashRouter>
    </React.StrictMode>
);
