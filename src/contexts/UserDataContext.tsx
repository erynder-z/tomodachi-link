import { createContext, useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useInfoOverlay from '../hooks/useInfoOverlay';
import { UserDataContextProps } from '../types/userDataContextTypes';
import { UserDataType } from '../types/userDataType';
import { fetchUserData } from '../utilities/fetchUserData';

const UserDataContext = createContext<UserDataContextProps>({
    userData: null,
    setUserData: () => null,
});

export const UserDataContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { token, authUser, isAuth } = useAuth();
    const { setInfo } = useInfoOverlay();
    const [userData, setUserData] = useState<UserDataType | null>(null);

    useEffect(() => {
        setUserData(null);
    }, [!isAuth]);

    useEffect(() => {
        if (authUser && token) {
            fetchUserData(token, setUserData, setInfo);
        }
    }, [isAuth]);

    return (
        <UserDataContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserDataContext.Provider>
    );
};

export default UserDataContext;
