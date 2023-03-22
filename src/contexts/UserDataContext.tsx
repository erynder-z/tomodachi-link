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
    // Retrieve token, authenticated user and authentication status from the useAuth hook
    const { token, authUser, isAuth } = useAuth();

    // Retrieve setInfo function from the useInfoOverlay hook
    const { setInfo } = useInfoOverlay();

    // Declare userData state with initial value of null
    const [userData, setUserData] = useState<UserDataType | null>(null);

    // Clear userData state if authentication status changes to false
    useEffect(() => {
        setUserData(null);
    }, [!isAuth]);

    // Fetch user data if the token and authenticated user are both present
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
