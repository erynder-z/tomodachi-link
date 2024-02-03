import { createContext, useEffect, useState } from 'react';
import {
    InfoCardContextProps,
    InfoCardContextProviderProps,
    InfoType,
} from '../types/infoTypes';

/**
 * React context for managing and providing information card data.
 *
 * @context
 * @type {React.Context<InfoCardContextProps>}
 */
const InfoCardContext: React.Context<InfoCardContextProps> =
    createContext<InfoCardContextProps>({
        info: null,
        setInfo: () => {
            null;
        },
    });

/**
 * Component for providing the InfoCardContext to the application.
 *
 * @component
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the context provider.
 * @returns {JSX.Element} The rendered InfoCardContextProvider component.
 */
export function InfoCardContextProvider({
    children,
}: InfoCardContextProviderProps): JSX.Element {
    const [info, setInfo] = useState<InfoType | null>(null);

    /**
     * useEffect hook to automatically clear the info after a specified time delay.
     *
     * @effect
     * @returns {void}
     */
    useEffect(() => {
        const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
            setInfo(null);
        }, 3500);

        return () => clearTimeout(timer);
    }, [info?.message]);

    /**
     * JSX Element representing the InfoCardContextProvider with children components.
     *
     * @type {JSX.Element}
     */
    return (
        <InfoCardContext.Provider value={{ info, setInfo }}>
            {children}
        </InfoCardContext.Provider>
    );
}

export default InfoCardContext;
