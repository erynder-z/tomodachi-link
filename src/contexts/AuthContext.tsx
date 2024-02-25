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

/**
 * React context for managing authentication state and providing authentication-related functionalities.
 *
 * @context
 * @type {React.Context<AuthContextProps>}
 */
const AuthContext: React.Context<AuthContextProps> =
    createContext<AuthContextProps>({
        token: null,
        authUser: null,
        isAuth: false,
        tokenExpiration: null,
        setToken: () => null,
        setAuthUser: () => null,
        setIsAuth: () => false,
        logout: () => null,
    });

/**
 * Function to retrieve the authentication token from encrypted storage.
 *
 * @function
 * @returns {string | null} The retrieved authentication token.
 */
const retrieveTokenFromEncryptedStorage = (): string | null => {
    try {
        return encryptStorage.getItem('jwtTomodachiLink') || null;
    } catch (error) {
        console.error('Error retrieving token:', error);
        return null;
    }
};

/**
 * Component for providing the AuthContext to the application.
 *
 * @component
 * @param {AuthContextProviderProps} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the context provider.
 * @returns {JSX.Element} The rendered AuthContextProvider component.
 */
export const AuthContextProvider = ({
    children,
}: AuthContextProviderProps): JSX.Element => {
    const [token, setToken] = useState<string | null>(
        retrieveTokenFromEncryptedStorage()
    );
    const [authUser, setAuthUser] = useState<User | null>(null);
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [tokenExpiration, setTokenExpiration] = useState<number | null>(null);
    const { setInfo } = useInfoCard();
    const { setCurrentUserData } = useCurrentUserData();
    const [loading, setLoading] = useState<boolean>(true);

    /**
     * useEffect hook to store the token in local storage when it changes.
     *
     * @effect
     * @returns {void}
     */
    useEffect(() => {
        if (token) {
            encryptStorage.setItem('jwtTomodachiLink', token);
        } else {
            encryptStorage.removeItem('jwtTomodachiLink');
        }
    }, [token]);

    /**
     * useEffect hook to check the token with the server to verify the user's authentication status.
     *
     * @effect
     * @returns {void}
     */
    useEffect(() => {
        const getUserFromToken = async () => {
            try {
                const SERVER_URL = import.meta.env.VITE_SERVER_URL;
                const response = await fetch(
                    `${SERVER_URL}/api/v1/token-user`,
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

        /**
         * Function to get the expiration time from the decoded token and set it in the state.
         *
         * @function
         * @returns {void}
         */
        const getTokenExpirationTime = (): void => {
            if (token) {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const expirationTime = decodedToken.exp * 1000;
                setTokenExpiration(expirationTime);
            }
        };

        if (token) {
            getUserFromToken();
            getTokenExpirationTime();
        } else {
            setLoading(false);
        }
    }, [token]);

    /**
     * Function to handle user logout.
     *
     * @function
     * @returns {void}
     */
    const logout = (): void => {
        setToken(null);
        setAuthUser(null);
        setIsAuth(false);
        setInfo(null);
        setCurrentUserData(null);
        encryptStorage.removeItem('jwtTomodachiLink');
    };

    /**
     * JSX Element representing the AuthContextProvider with loading spinner.
     *
     * @type {JSX.Element}
     */
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
