import { createContext, useEffect, useRef, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useInfoCard from '../hooks/useInfoCard';
import { CurrentUserDataContextProps } from '../types/currentUserTypes';
import { CurrentUserDataType } from '../types/currentUserTypes';
import { backendFetch } from '../utilities/backendFetch';

const CurrentUserDataContext = createContext<CurrentUserDataContextProps>({
    currentUserData: null,
    setCurrentUserData: () => null,
    handleFetchUserData: () => null,
});

export const CurrentUserDataContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    // Retrieve token, authenticated user and authentication status from the useAuth hook
    const { token, authUser, isAuth } = useAuth();

    // Retrieve setInfo function from the useInfoCard hook
    const { setInfo } = useInfoCard();

    // Declare userData state with initial value of null
    const [currentUserData, setCurrentUserData] =
        useState<CurrentUserDataType | null>(null);

    const shouldFetchUserData = useRef(true);

    // Define trigger function
    const handleFetchUserData = async () => {
        if (authUser && token) {
            const API_ENDPOINT_URL = '/api/v1/userdata';
            const METHOD = 'GET';
            const ERROR_MESSAGE = 'Unable to fetch userdata';

            const response = await backendFetch(
                token,
                setInfo,
                API_ENDPOINT_URL,
                METHOD,
                ERROR_MESSAGE
            );
            setCurrentUserData(response?.user);
        }
    };

    // Clear userData state if authentication status changes to false
    useEffect(() => {
        setCurrentUserData(null);
    }, [!isAuth]);

    // Fetch user data if the token and authenticated user are both present
    useEffect(() => {
        if (authUser && token && shouldFetchUserData.current) {
            handleFetchUserData();

            return () => {
                shouldFetchUserData.current = false;
            };
        }
        if (!isAuth) shouldFetchUserData.current = true;
    }, [isAuth]);

    return (
        <CurrentUserDataContext.Provider
            value={{ currentUserData, setCurrentUserData, handleFetchUserData }}
        >
            {children}
        </CurrentUserDataContext.Provider>
    );
};

export default CurrentUserDataContext;
