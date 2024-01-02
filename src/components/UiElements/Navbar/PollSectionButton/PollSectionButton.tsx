import { MdPieChartOutlined } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function PollSectionButton() {
    return (
        <motion.button whileTap={{ scale: 0.97 }}>
            <NavLink
                to="/polls"
                className={({ isActive }) =>
                    isActive
                        ? 'text-highlight dark:text-highlightDark hover:text-highlight dark:hover:text-highlightDark flex self-center cursor-pointer h-6 w-full'
                        : 'text-regularText dark:text-regularTextDark hover:text-regularText dark:hover:text-regularTextDark flex self-center cursor-pointer h-6 w-full '
                }
            >
                <MdPieChartOutlined size="1.5em" />
            </NavLink>
        </motion.button>
    );
}
