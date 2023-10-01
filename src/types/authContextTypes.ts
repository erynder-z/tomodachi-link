export type User = {
    user: {
        _id: string;
        username: string;
    };
};

export type AuthContextProviderProps = {
    children: React.ReactElement;
};

export type AuthContextProps = {
    token: string | null;
    authUser: User | null;
    isAuth: boolean;
    setToken: (token: string | null) => void;
    setAuthUser: (user: User | null) => void;
    setIsAuth: (isAuth: boolean) => void;
    logout: () => void;
};
