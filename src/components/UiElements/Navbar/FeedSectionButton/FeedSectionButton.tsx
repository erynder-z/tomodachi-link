import { MdDynamicFeed } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';

/**
 * React component for rendering a feed section button.
 *
 * @component
 * @returns {JSX.Element} The rendered FeedSectionButton component.
 */
export default function FeedSectionButton(): JSX.Element {
    /**
     * Render the FeedSectionButton component.
     *
     * @type {JSX.Element}
     */
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
