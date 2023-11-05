import { createContext, useState } from 'react';
import { ScanLinesType, ThemeType } from '../types/miscTypes';

type ThemeContextProviderProps = {
    children: React.ReactElement;
};

type ThemeContextProps = {
    theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
    scanLines: ScanLinesType;
    setScanLines: (scanLines: ScanLinesType) => void;
};

const ThemeContext = createContext<ThemeContextProps>({
    theme: 'bright',
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    setTheme: (theme: ThemeType) => {},
    scanLines: 'none',
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    setScanLines: (scanLines: ScanLinesType) => {},
});

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
    const [theme, setTheme] = useState<ThemeType>(
        (localStorage.getItem('themeOdinBook') as ThemeType) || 'bright'
    );
    const [scanLines, setScanLines] = useState<ScanLinesType>(
        (localStorage.getItem('scanLinesOdinBook') as ScanLinesType) || 'none'
    );

    return (
        <ThemeContext.Provider
            value={{ theme, setTheme, scanLines, setScanLines }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeContext;
