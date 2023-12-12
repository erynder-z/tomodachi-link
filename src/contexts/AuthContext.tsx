import { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import {
    AuthContextProps,
    AuthContextProviderProps,
    User,
} from '../types/authTypes';
import useInfoCard from '../hooks/useInfoCard';
import useCurrentUserData from '../hooks/useCurrentUserData';
import FullscreenLoading from '../components/UiElements/LoadingSpinner/FullscreenLoading';

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

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [cookies, setCookie, removeCookie] = useCookies(['jwtOdinBook']);
    const [authUser, setAuthUser] = useState<User | null>(null);
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [tokenExpiration, setTokenExpiration] = useState<number | null>(null);
    const { setInfo } = useInfoCard();
    const { setCurrentUserData } = useCurrentUserData();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // When the token changes, store it in the cookie
        if (cookies.jwtOdinBook) {
            setCookie('jwtOdinBook', cookies.jwtOdinBook);
        } else {
            removeCookie('jwtOdinBook');
        }
    }, [cookies.jwtOdinBook, setCookie, removeCookie]);

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
                            Authorization: `Bearer ${
                                cookies.jwtOdinBook || ''
                            }`,
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
            if (cookies.jwtOdinBook) {
                const decodedToken = JSON.parse(
                    atob(cookies.jwtOdinBook.split('.')[1])
                );
                const expirationTime = decodedToken.exp * 1000;
                setTokenExpiration(expirationTime);
            }
        };

        if (cookies.jwtOdinBook) {
            checkToken();
            getTokenExpirationTime();
        } else {
            setLoading(false);
        }
    }, [cookies.jwtOdinBook, setCookie]);

    const logout = () => {
        removeCookie('jwtOdinBook');
        setAuthUser(null);
        setIsAuth(false);
        setInfo(null);
        setCurrentUserData(null);
        localStorage.removeItem('currentViewOdinBook');
    };

    return (
        <AuthContext.Provider
            value={{
                token: cookies.jwtOdinBook || null,
                authUser,
                isAuth,
                tokenExpiration,
                setToken: (token) => setCookie('jwtOdinBook', token),
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
