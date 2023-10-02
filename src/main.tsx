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
import { NotificationBubblesContextProvider } from './contexts/NotificationBubblesContext';
import { SeedContextProvider } from './contexts/SeedContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <HashRouter>
            <AuthContextProvider>
                <SeedContextProvider>
                    <CurrentUserDataContextProvider>
                        <FriendDataContextProvider>
                            <InfoCardContextProvider>
                                <ThemeContextProvider>
                                    <NotificationBubblesContextProvider>
                                        <App />
                                    </NotificationBubblesContextProvider>
                                </ThemeContextProvider>
                            </InfoCardContextProvider>
                        </FriendDataContextProvider>
                    </CurrentUserDataContextProvider>
                </SeedContextProvider>
            </AuthContextProvider>
        </HashRouter>
    </React.StrictMode>
);
