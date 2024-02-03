import { createContext, useEffect, useRef, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useInfoCard from '../hooks/useInfoCard';
import { CurrentUserDataContextProps } from '../types/currentUserTypes';
import { CurrentUserDataType } from '../types/currentUserTypes';
import { backendFetch } from '../utilities/backendFetch';

/**
 * React context for managing and providing the current user's data.
 *
 * @context
 * @type {React.Context<CurrentUserDataContextProps>}
 */
const CurrentUserDataContext: React.Context<CurrentUserDataContextProps> =
    createContext<CurrentUserDataContextProps>({
        currentUserData: null,
        setCurrentUserData: () => null,
        handleFetchUserData: () => null,
    });

/**
 * Component for providing the CurrentUserDataContext to the application.
 *
 * @component
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the context provider.
 * @returns {JSX.Element} The rendered CurrentUserDataContextProvider component.
 */
export const CurrentUserDataContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element => {
    // Retrieve token, authenticated user and authentication status from the useAuth hook
    const { token, authUser, isAuth } = useAuth();

    // Retrieve setInfo function from the useInfoCard hook
    const { setInfo } = useInfoCard();

    // Declare userData state with initial value of null
    const [currentUserData, setCurrentUserData] =
        useState<CurrentUserDataType | null>(null);

    const shouldFetchUserData = useRef(true);

    /**
     * Function to fetch user data from the server using the backendFetch utility.
     *
     * @function
     * @return {Promise<void>} A promise that resolves once the user data is fetched.
     */
    const handleFetchUserData = async (): Promise<void> => {
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

    /**
     * useEffect hook to clear userData state if authentication status changes to false.
     *
     * @effect
     * @returns {void}
     */
    useEffect(() => {
        setCurrentUserData(null);
    }, [!isAuth]);

    /**
     * useEffect hook to fetch user data if the token and authenticated user are both present.
     *
     * @effect
     * @returns {void}
     */
    useEffect(() => {
        if (authUser && token && shouldFetchUserData.current) {
            handleFetchUserData();

            return () => {
                shouldFetchUserData.current = false;
            };
        }
        if (!isAuth) shouldFetchUserData.current = true;
    }, [isAuth]);

    /**
     * JSX Element representing the CurrentUserDataContextProvider with children components.
     *
     * @type {JSX.Element}
     */
    return (
        <CurrentUserDataContext.Provider
            value={{ currentUserData, setCurrentUserData, handleFetchUserData }}
        >
            {children}
        </CurrentUserDataContext.Provider>
    );
};

export default CurrentUserDataContext;
