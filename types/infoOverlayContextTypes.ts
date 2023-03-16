import React from 'react';

export type Info = {
    message: string;
};

export type InfoOverlayContextProviderProps = {
    children: React.ReactElement;
};

export type InfoOverlayContextProps = {
    info: Info | null;
    setInfo: (info: Info | null) => void;
};
