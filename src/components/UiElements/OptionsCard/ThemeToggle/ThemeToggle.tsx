import { TbSun, TbMoon } from 'react-icons/tb';
import useTheme from '../../../../hooks/useTheme';
import { ThemeType } from '../../../../types/miscTypes';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        const newTheme: ThemeType = theme === 'bright' ? 'dark' : 'bright';
        setTheme(newTheme);
        localStorage.setItem('themeOdinBook', newTheme);
    };

    const icon =
        theme === 'dark' ? <TbSun size="1.5em" /> : <TbMoon size="1.5em" />;

    return (
        <div
            onClick={toggleTheme}
            className="cursor-pointer  hover:text-highlight dark:hover:text-highlightDark duration-300"
        >
            {icon}
        </div>
    );
}
