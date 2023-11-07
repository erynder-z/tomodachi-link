import { createContext, useEffect, useState } from 'react';
import { FriendDataContextProps, FriendDataType } from '../types/friendTypes';
import useAuth from '../hooks/useAuth';
import useInfoCard from '../hooks/useInfoCard';
import { backendFetch } from '../utilities/backendFetch';

const FriendDataContext = createContext<FriendDataContextProps>({
    friendData: null,
    friendIDs: [],
    setFriendData: () => null,
    handleFetchFriendData: () => null,
});

export const FriendDataContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { token, authUser, isAuth } = useAuth();
    const { setInfo } = useInfoCard();

    const [friendData, setFriendData] = useState<FriendDataType[] | null>(null);

    const handleFetchFriendData = async () => {
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

    const friendIDs = friendData ? friendData.map((friend) => friend._id) : [];

    useEffect(() => {
        setFriendData(null);
    }, [!isAuth]);

    useEffect(() => {
        if (authUser && token) handleFetchFriendData();
    }, [isAuth]);

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
