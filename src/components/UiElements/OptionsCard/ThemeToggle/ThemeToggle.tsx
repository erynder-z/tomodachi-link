import { TbSun, TbMoon } from 'react-icons/tb';
import useTheme from '../../../../hooks/useTheme';
import { ThemeType } from '../../../../types/miscTypes';
import { AnimatePresence, motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';

export default function ThemeToggle() {
    const { colorScheme, setColorScheme } = useTheme();

    const toggleTheme = () => {
        const newTheme: ThemeType =
            colorScheme === 'bright' ? 'dark' : 'bright';
        setColorScheme(newTheme);
        localStorage.setItem('colorSchemeOdinBook', newTheme);
    };

    const iconRotation = colorScheme === 'dark' ? 180 : 0;

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
