import { UserDataType } from './userDataType';

export type UserDataContextProviderProps = {
    children: React.ReactElement;
};

export type UserDataContextProps = {
    userData: UserDataType | null;
    setUserData: (user: UserDataType | null) => void;
    handleFetchUserData: () => void;
};
