import { MdDynamicFeed } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';

export default function FeedSectionButton() {
    return (
        <motion.button
            data-tooltip-id="navbar-feed-tooltip"
            data-tooltip-content="Go to feed"
            data-tooltip-variant="dark"
            data-tooltip-delay-show={500}
            whileTap={{ scale: 0.97 }}
        >
            <NavLink
                to="/feed"
                className={({ isActive }) =>
                    isActive
                        ? 'text-highlight dark:text-highlightDark hover:text-highlight dark:hover:text-highlightDark flex self-center cursor-pointer h-6 w-full'
                        : 'text-regularText dark:text-regularTextDark hover:text-regularText dark:hover:text-regularTextDark flex self-center cursor-pointer h-6 w-full '
                }
            >
                <MdDynamicFeed size="1.5em" />
            </NavLink>
            <Tooltip
                id="navbar-feed-tooltip"
                style={{ fontSize: '0.75rem', zIndex: 99 }}
            />
        </motion.button>
    );
}
