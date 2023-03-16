import { createContext, useState } from 'react';
import {
    InfoOverlayContextProps,
    InfoOverlayContextProviderProps,
    Info,
} from '../../types/infoOverlayContextTypes';

const InfoOverlayContext = createContext<InfoOverlayContextProps>({
    info: null,
    setInfo: () => {
        null;
    },
});

export function InfoOverlayContextProvider({
    children,
}: InfoOverlayContextProviderProps) {
    const [info, setInfo] = useState<Info | null>(null);
    return (
        <InfoOverlayContext.Provider value={{ info, setInfo }}>
            {children}
        </InfoOverlayContext.Provider>
    );
}

export default InfoOverlayContext;
