import { createContext, useEffect, useState } from 'react';
import {
    AuthContextProps,
    AuthContextProviderProps,
    User,
} from '../types/authContextTypes';

const AuthContext = createContext<AuthContextProps>({
    token: null,
    authUser: null,
    isAuth: false,
    setToken: () => null,
    setAuthUser: () => null,
    setIsAuth: () => false,
    logout: () => null,
});

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem('jwtOdinBook') || null
    );
    const [authUser, setAuthUser] = useState<User | null>(null);
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
                setAuthUser(data);
                setIsAuth(true);
            } catch (error: unknown) {
                setAuthUser(null);
                setIsAuth(false);
                console.error(error);
            }
        };

        if (token) {
            checkToken();
        }
    }, [token]);

    const logout = () => {
        setToken(null);
        setAuthUser(null);
        setIsAuth(false);
        window.localStorage.clear();
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                authUser,
                isAuth,
                setToken,
                setAuthUser,
                setIsAuth,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
