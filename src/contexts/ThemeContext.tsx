import { createContext, useState } from 'react';
import { ThemeType } from '../types/miscTypes';

type ThemeContextProviderProps = {
    children: React.ReactElement;
};

type ThemeContextProps = {
    theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
};

const ThemeContext = createContext<ThemeContextProps>({
    theme: 'bright',
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    setTheme: (theme: ThemeType) => {},
});

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
    const [theme, setTheme] = useState<ThemeType>(
        (localStorage.getItem('themeOdinBook') as ThemeType) || 'bright'
    );

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeContext;
