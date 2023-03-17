import React from 'react';
import { InfoType } from './infoType';

export type InfoOverlayContextProviderProps = {
    children: React.ReactElement;
};

export type InfoOverlayContextProps = {
    info: InfoType | null;
    setInfo: (info: InfoType | null) => void;
};
