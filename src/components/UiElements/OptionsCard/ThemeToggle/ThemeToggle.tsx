import { TbSun, TbMoon } from 'react-icons/tb';
import useTheme from '../../../../hooks/useTheme';
import { ThemeType } from '../../../../types/miscTypes';
import { AnimatePresence, motion } from 'framer-motion';

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
        </AnimatePresence>
    );
}
