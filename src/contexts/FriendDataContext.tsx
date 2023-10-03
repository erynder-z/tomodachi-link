import { createContext, useEffect, useState } from 'react';
import { FriendDataContextProps, FriendDataType } from '../types/friendTypes';
import useAuth from '../hooks/useAuth';
import useInfoCard from '../hooks/useInfoCard';
import { backendFetch } from '../utilities/backendFetch';

const FriendDataContext = createContext<FriendDataContextProps>({
    friendData: null,
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
            const apiEndpointURL = '/api/v1/frienddata';
            const method = 'GET';

            const errorMessage = 'Unable to fetch friend data!';

            const response = await backendFetch(
                token,
                setInfo,
                apiEndpointURL,
                method,
                errorMessage
            );
            setFriendData(response?.friendDataList);
        }
    };

    useEffect(() => {
        setFriendData(null);
    }, [!isAuth]);

    useEffect(() => {
        if (authUser && token) handleFetchFriendData();
    }, [isAuth]);

    return (
        <FriendDataContext.Provider
            value={{ friendData, setFriendData, handleFetchFriendData }}
        >
            {children}
        </FriendDataContext.Provider>
    );
};

export default FriendDataContext;
