import { TbSun, TbMoon } from 'react-icons/tb';
import useTheme from '../../../../hooks/useTheme';
import { ThemeType } from '../../../../types/miscTypes';
import { AnimatePresence, motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';

/**
 * React component for rendering a toggle button for changing the theme (dark/bright mode).
 *
 * @component
 * @returns {JSX.Element} The rendered ThemeToggle component.
 */
export default function ThemeToggle(): JSX.Element {
    const { colorScheme, setColorScheme } = useTheme();

    const iconRotation = colorScheme === 'dark' ? 180 : 0;

    /**
     * Toggles the color scheme between 'bright' and 'dark', and updates local storage.
     *
     * @function
     * @returns {void}
     */
    const toggleTheme = (): void => {
        const newTheme: ThemeType =
            colorScheme === 'bright' ? 'dark' : 'bright';
        setColorScheme(newTheme);
        localStorage.setItem('colorSchemeTomodachiLink', newTheme);
    };

    /**
     * Rendered JSX for the ThemeToggle component.
     *
     * @type {JSX.Element}
     */
    return (
        <AnimatePresence initial={false}>
            <motion.div
                key="themeToggle"
                data-tooltip-id="options-darkmode-tooltip"
                data-tooltip-content="Toggle dark mode"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
                onClick={toggleTheme}
                whileTap={{ scale: 0.97 }}
                className="cursor-pointer hover:text-highlight dark:hover:text-highlightDark duration-300"
            >
                <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: iconRotation }}
                    transition={{ type: 'spring', stiffness: 100 }}
                >
                    {colorScheme === 'dark' ? (
                        <TbSun size="1.5em" />
                    ) : (
                        <TbMoon size="1.5em" />
                    )}
                </motion.div>
            </motion.div>
            <Tooltip
                id="options-darkmode-tooltip"
                style={{ fontSize: '0.75rem', zIndex: 99 }}
            />
        </AnimatePresence>
    );
}
