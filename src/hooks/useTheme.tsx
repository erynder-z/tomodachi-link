import { useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';
import { ThemeContextProps } from '../types/miscTypes';

/**
 * Returns the theme context hook.
 *
 * @return {ThemeContextProps} The theme context hook
 */
const useTheme = (): ThemeContextProps => {
    return useContext(ThemeContext);
};

export default useTheme;
