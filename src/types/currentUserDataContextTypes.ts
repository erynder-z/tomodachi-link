import { OwnUserDataType } from './currentUserDataType';

export type CurrentUserDataContextProviderProps = {
    children: React.ReactElement;
};

export type CurrentUserDataContextProps = {
    currentUserData: OwnUserDataType | null;
    setCurrentUserData: (user: OwnUserDataType | null) => void;
    handleFetchUserData: () => void;
};
