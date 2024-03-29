import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthContextProvider } from './contexts/AuthContext';
import { InfoCardContextProvider } from './contexts/InfoCardContext';
import { CurrentUserDataContextProvider } from './contexts/CurrentUserDataContext';
import './index.css';
import { FriendDataContextProvider } from './contexts/FriendDataContext';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { NotificationBubblesContextProvider } from './contexts/NotificationBubblesContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
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
            </AuthContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);
