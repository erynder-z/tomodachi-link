import { createContext, useEffect, useState } from 'react';
import {
    AuthContextProps,
    AuthContextProviderProps,
    User,
} from '../types/authTypes';
import useInfoCard from '../hooks/useInfoCard';
import useCurrentUserData from '../hooks/useCurrentUserData';
import FullscreenLoading from '../components/UiElements/LoadingSpinner/FullscreenLoading';
import { encryptStorage } from '../utilities/encryptedStorage';

// Create an empty context object with default values for authentication state
const AuthContext = createContext<AuthContextProps>({
    token: null,
    authUser: null,
    isAuth: false,
    tokenExpiration: null,
    setToken: () => null,
    setAuthUser: () => null,
    setIsAuth: () => false,
    logout: () => null,
});

const retrieveTokenFromEncryptedStorage = () => {
    try {
        return encryptStorage.getItem('jwtOdinBook') || null;
    } catch (error) {
        console.error('Error retrieving token:', error);
        return null;
    }
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [token, setToken] = useState<string | null>(
        retrieveTokenFromEncryptedStorage()
    );
    const [authUser, setAuthUser] = useState<User | null>(null);
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [tokenExpiration, setTokenExpiration] = useState<number | null>(null);
    const { setInfo } = useInfoCard();
    const { setCurrentUserData } = useCurrentUserData();
    const [loading, setLoading] = useState<boolean>(true);

    // When the token changes, store it in local storage
    useEffect(() => {
        if (token) {
            encryptStorage.setItem('jwtOdinBook', token);
        } else {
            encryptStorage.removeItem('jwtOdinBook');
        }
    }, [token]);

    // When the token changes, check it with the server to verify the user's authentication status
    useEffect(() => {
        const checkToken = async () => {
            try {
                const SERVER_URL = import.meta.env.VITE_SERVER_URL;
                const response = await fetch(
                    `${SERVER_URL}/api/v1/check-token`,
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
                setLoading(false);
            } catch (error: unknown) {
                setAuthUser(null);
                setIsAuth(false);
                setLoading(false);
                console.error(error);
            }
        };

        const getTokenExpirationTime = () => {
            if (token) {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const expirationTime = decodedToken.exp * 1000;
                setTokenExpiration(expirationTime);
            }
        };

        if (token) {
            checkToken();
            getTokenExpirationTime();
        } else {
            setLoading(false);
        }
    }, [token]);

    const logout = () => {
        setToken(null);
        setAuthUser(null);
        setIsAuth(false);
        setInfo(null);
        setCurrentUserData(null);
        localStorage.removeItem('currentViewOdinBook');
        encryptStorage.removeItem('jwtOdinBook');
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                authUser,
                isAuth,
                tokenExpiration,
                setToken,
                setAuthUser,
                setIsAuth,
                logout,
            }}
        >
            {loading ? (
                <FullscreenLoading message={'Verifying user data'} />
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};

export default AuthContext;
