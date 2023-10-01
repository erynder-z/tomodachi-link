import React from 'react';

export type InfoCardContextProviderProps = {
    children: React.ReactElement;
};

export type InfoCardContextProps = {
    info: InfoType | null;
    setInfo: (info: InfoType | null) => void;
};

export type InfoType = {
    typeOfInfo?: 'good' | 'bad' | 'neutral' | 'greeting';
    message: string;
    icon?: string;
};
