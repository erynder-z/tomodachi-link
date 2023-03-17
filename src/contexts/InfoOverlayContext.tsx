import { createContext, useEffect, useState } from 'react';
import {
    InfoOverlayContextProps,
    InfoOverlayContextProviderProps,
} from '../../types/infoOverlayContextTypes';
import { InfoType } from '../../types/infoType';

const InfoOverlayContext = createContext<InfoOverlayContextProps>({
    info: null,
    setInfo: () => {
        null;
    },
});

export function InfoOverlayContextProvider({
    children,
}: InfoOverlayContextProviderProps) {
    const [info, setInfo] = useState<InfoType | null>(null);
    useEffect(() => {
        setTimeout(() => {
            setInfo(null);
        }, 2000);
    }, [info?.message]);

    return (
        <InfoOverlayContext.Provider value={{ info, setInfo }}>
            {children}
        </InfoOverlayContext.Provider>
    );
}

export default InfoOverlayContext;
