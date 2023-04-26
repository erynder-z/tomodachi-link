import React from 'react';
import { InfoType } from './infoType';

export type InfoCardContextProviderProps = {
    children: React.ReactElement;
};

export type InfoCardContextProps = {
    info: InfoType | null;
    setInfo: (info: InfoType | null) => void;
};
