import React from 'react';

export type User = {
    _id: string;
    username: string;
};

export type AuthContextProviderProps = {
    children: React.ReactElement;
};

export type AuthContextProps = {
    token: string | null;
    user: User | null;
    isAuth: boolean;
    setToken: (token: string | null) => void;
    setUser: (user: User | null) => void;
    setIsAuth: (isAuth: boolean) => void;
};
