import { createContext, useEffect, useState } from 'react';
import { FriendDataContextProps } from '../types/friendDataContextTypes';
import { FriendDataType } from '../types/friendDataType';
import useAuth from '../hooks/useAuth';
import useInfoOverlay from '../hooks/useInfoOverlay';
import { fetchFriendData } from '../utilities/fetchFriendData';

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
    const { setInfo } = useInfoOverlay();

    const [friendData, setFriendData] = useState<FriendDataType[] | null>(null);

    const handleFetchFriendData = async () => {
        if (authUser && token) {
            const response = await fetchFriendData(token, setInfo);
            setFriendData(response);
        }
    };

    useEffect(() => {
        setFriendData(null);
    }, [!isAuth]);

    useEffect(() => {
        if (authUser && token) {
            handleFetchFriendData();
        }
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
