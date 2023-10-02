import { createContext, useEffect, useState } from 'react';
import {
    InfoCardContextProps,
    InfoCardContextProviderProps,
    InfoType,
} from '../types/infoTypes';

const InfoCardContext = createContext<InfoCardContextProps>({
    info: null,
    setInfo: () => {
        null;
    },
});

export function InfoCardContextProvider({
    children,
}: InfoCardContextProviderProps) {
    const [info, setInfo] = useState<InfoType | null>(null);
    useEffect(() => {
        const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
            setInfo(null);
        }, 3500);

        return () => clearTimeout(timer);
    }, [info?.message]);

    return (
        <InfoCardContext.Provider value={{ info, setInfo }}>
            {children}
        </InfoCardContext.Provider>
    );
}

export default InfoCardContext;
