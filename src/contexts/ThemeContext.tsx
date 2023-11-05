import { createContext, useState } from 'react';
import { ScanLinesType, ThemeType } from '../types/miscTypes';

type ThemeContextProviderProps = {
    children: React.ReactElement;
};

type ThemeContextProps = {
    colorScheme: ThemeType;
    setColorScheme: (colorScheme: ThemeType) => void;
    scanLines: ScanLinesType;
    setScanLines: (scanLines: ScanLinesType) => void;
};

const ThemeContext = createContext<ThemeContextProps>({
    colorScheme: 'bright',
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    setColorScheme: (colorScheme: ThemeType) => {},
    scanLines: 'none',
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    setScanLines: (scanLines: ScanLinesType) => {},
});

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
    const [colorScheme, setColorScheme] = useState<ThemeType>(
        (localStorage.getItem('colorSchemeOdinBook') as ThemeType) || 'bright'
    );
    const [scanLines, setScanLines] = useState<ScanLinesType>(
        (localStorage.getItem('scanLinesOdinBook') as ScanLinesType) || 'none'
    );

    return (
        <ThemeContext.Provider
            value={{ colorScheme, setColorScheme, scanLines, setScanLines }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeContext;
