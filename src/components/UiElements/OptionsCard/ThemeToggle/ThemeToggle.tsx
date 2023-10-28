import { TbSun, TbMoon } from 'react-icons/tb';
import useTheme from '../../../../hooks/useTheme';
import { ThemeType } from '../../../../types/miscTypes';
import { AnimatePresence, motion } from 'framer-motion';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        const newTheme: ThemeType = theme === 'bright' ? 'dark' : 'bright';
        setTheme(newTheme);
        localStorage.setItem('themeOdinBook', newTheme);
    };

    const iconRotation = theme === 'dark' ? 180 : 0;

    return (
        <AnimatePresence initial={false}>
            <motion.div
                onClick={toggleTheme}
                whileTap={{ scale: 0.97 }}
                className="cursor-pointer hover:text-highlight dark:hover:text-highlightDark duration-300"
            >
                <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: iconRotation }}
                    transition={{ type: 'spring', stiffness: 100 }}
                >
                    {theme === 'dark' ? (
                        <TbSun size="1.5em" />
                    ) : (
                        <TbMoon size="1.5em" />
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
