import { createContext, useEffect, useRef, useState } from 'react';
import { FriendDataContextProps, FriendDataType } from '../types/friendTypes';
import useAuth from '../hooks/useAuth';
import useInfoCard from '../hooks/useInfoCard';
import { backendFetch } from '../utilities/backendFetch';
import useCurrentUserData from '../hooks/useCurrentUserData';

/**
 * React context for managing and providing friend-related data.
 *
 * @context
 * @type {React.Context<FriendDataContextProps>}
 */
const FriendDataContext: React.Context<FriendDataContextProps> =
    createContext<FriendDataContextProps>({
        friendData: null,
        friendIDs: [],
        setFriendData: () => null,
        handleFetchFriendData: () => null,
    });

/**
 * Component for providing the FriendDataContext to the application.
 *
 * @component
 * @param {FriendDataContextProps} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the context provider.
 * @returns {JSX.Element} The rendered FriendDataContextProvider component.
 */
export const FriendDataContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element => {
    const { token, authUser, isAuth } = useAuth();
    const { setInfo } = useInfoCard();
    const { currentUserData } = useCurrentUserData();
    const [friendData, setFriendData] = useState<FriendDataType[] | null>(null);

    const shouldFetchFriendData = useRef(true);

    const numberOfFriends = currentUserData?.friends.length;
    const friendIDs = friendData ? friendData.map((friend) => friend._id) : [];

    /**
     * Function to fetch friend data from the server using the backendFetch utility.
     *
     * @function
     * @return {Promise<void>} A promise that resolves once the friend data is fetched.
     */
    const handleFetchFriendData = async (): Promise<void> => {
        if (authUser && token) {
            const API_ENDPOINT_URL = '/api/v1/frienddata';
            const METHOD = 'GET';
            const ERROR_MESSAGE = 'Unable to fetch friend data!';

            const response = await backendFetch(
                token,
                setInfo,
                API_ENDPOINT_URL,
                METHOD,
                ERROR_MESSAGE
            );
            setFriendData(response?.friendDataList);
        }
    };

    /**
     * useEffect hook to clear friendData state if authentication status changes to false.
     *
     * @effect
     * @returns {void}
     */
    useEffect(() => {
        setFriendData(null);
    }, [!isAuth]);

    /**
     * useEffect hook to fetch friend data if the token and authenticated user are both present.
     *
     * @effect
     * @returns {void}
     */
    useEffect(() => {
        if (authUser && token && shouldFetchFriendData.current) {
            handleFetchFriendData();
            return () => {
                shouldFetchFriendData.current = false;
            };
        }
    }, [isAuth]);

    /**
     * useEffect hook to fetch friend data when the number of friends changes.
     *
     * @effect
     * @returns {void}
     */
    useEffect(() => {
        if (authUser && token && numberOfFriends) handleFetchFriendData();
    }, [numberOfFriends]);

    /**
     * JSX Element representing the FriendDataContextProvider with children components.
     *
     * @type {JSX.Element}
     */
    return (
        <FriendDataContext.Provider
            value={{
                friendData,
                friendIDs,
                setFriendData,
                handleFetchFriendData,
            }}
        >
            {children}
        </FriendDataContext.Provider>
    );
};

export default FriendDataContext;
