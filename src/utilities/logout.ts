import { User } from '../types/authContextTypes';
import { UserDataType } from '../types/currentUserDataType';

type Props = {
    setToken: (token: string | null) => void;
    setUser: (user: User | null) => void;
    setIsAuth: (isAuth: boolean) => void;
    setUserData: React.Dispatch<React.SetStateAction<UserDataType | null>>;
};

export const logout = ({
    setToken,
    setUser,
    setIsAuth,
    setUserData,
}: Props) => {
    setToken(null);
    setUser(null);
    setIsAuth(false);
    setUserData(null);
};
