import { createContext, useEffect, useState } from 'react';
import {
    AuthContextProps,
    AuthContextProviderProps,
    User,
} from '../types/authContextTypes';

const AuthContext = createContext<AuthContextProps>({
    token: null,
    user: null,
    isAuth: false,
    setToken: () => {
        null;
    },
    setUser: () => {
        null;
    },
    setIsAuth: () => {
        false;
    },
});

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem('jwtOdinBook') || null
    );
    const [user, setUser] = useState<User | null>(null);
    const [isAuth, setIsAuth] = useState<boolean>(false);

    useEffect(() => {
        if (token) {
            localStorage.setItem('jwtOdinBook', token);
        } else {
            localStorage.removeItem('jwtOdinBook');
        }
    }, [token]);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const serverURL = import.meta.env.VITE_SERVER_URL;
                const response = await fetch(
                    `${serverURL}/api/v1/check-token`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (!response.ok) {
                    if (response.status === 401) {
                        throw new Error('Unauthorized: Token is expired');
                    } else {
                        throw new Error(
                            `Error: ${response.status} ${response.statusText}`
                        );
                    }
                }
                const data = await response.json();
                setUser(data); // TODO fetch userdata
                setIsAuth(true);
            } catch (error: unknown) {
                setUser(null);
                setIsAuth(false);
                console.error(error);
            }
        };

        if (token) {
            checkToken();
        }
    }, [token]);

    return (
        <AuthContext.Provider
            value={{ token, user, isAuth, setToken, setUser, setIsAuth }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
