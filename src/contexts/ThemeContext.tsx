import { createContext, useState } from 'react';
import {
    ScanLinesType,
    ThemeContextProps,
    ThemeType,
} from '../types/miscTypes';

type ThemeContextProviderProps = {
    children: React.ReactElement;
};

/**
 * React context for managing and providing theme-related data.
 *
 * @context
 * @type {React.Context<ThemeContextProps>}
 */
const ThemeContext: React.Context<ThemeContextProps> =
    createContext<ThemeContextProps>({
        colorScheme: 'bright',
        // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
        setColorScheme: (colorScheme: ThemeType) => {},
        scanLines: 'none',
        // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
        setScanLines: (scanLines: ScanLinesType) => {},
        isMobileDevice: false,
    });

/**
 * Component for providing the ThemeContext to the application.
 *
 * @component
 * @param {object} props - The component props.
 * @param {React.ReactElement} props.children - The child components to be wrapped by the context provider.
 * @returns {JSX.Element} The rendered ThemeContextProvider component.
 */
export function ThemeContextProvider({
    children,
}: ThemeContextProviderProps): JSX.Element {
    const [colorScheme, setColorScheme] = useState<ThemeType>(
        (localStorage.getItem('colorSchemeTomodachiLink') as ThemeType) ||
            'bright'
    );
    const [scanLines, setScanLines] = useState<ScanLinesType>(
        (localStorage.getItem('scanLinesTomodachiLink') as ScanLinesType) ||
            'none'
    );
    const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);

    /**
     * JSX Element representing the ThemeContextProvider with children components.
     *
     * @type {JSX.Element}
     */
    return (
        <ThemeContext.Provider
            value={{
                colorScheme,
                setColorScheme,
                scanLines,
                setScanLines,
                isMobileDevice,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeContext;
