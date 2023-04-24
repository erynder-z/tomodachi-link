import { CurrentUserDataType } from './currentUserDataType';

export type CurrentUserDataContextProviderProps = {
    children: React.ReactElement;
};

export type CurrentUserDataContextProps = {
    currentUserData: CurrentUserDataType | null;
    setCurrentUserData: (user: CurrentUserDataType | null) => void;
    handleFetchUserData: () => void;
};
