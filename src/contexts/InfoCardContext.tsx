import { createContext, useEffect, useState } from 'react';
import {
    InfoCardContextProps,
    InfoCardContextProviderProps,
} from '../types/infoCardContextTypes';
import { InfoType } from '../types/infoType';

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
        setTimeout(() => {
            setInfo(null);
        }, 5000);
    }, [info?.message]);

    return (
        <InfoCardContext.Provider value={{ info, setInfo }}>
            {children}
        </InfoCardContext.Provider>
    );
}

export default InfoCardContext;
