import { MdOutlineDiversity3 } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';

/**
 * React component for rendering a friend section button.
 *
 * @component
 * @returns {JSX.Element} The rendered FriendSectionButton component.
 */
export default function FriendSectionButton(): JSX.Element {
    /**
     * Render the FriendSectionButton component.
     *
     * @type {JSX.Element}
     */
    return (
        <>
            <motion.button
                data-tooltip-id="navbar-friend-tooltip"
                data-tooltip-content="Go to friend section"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
                whileTap={{ scale: 0.97 }}
            >
                <NavLink
                    to="/friends"
                    className={({ isActive }) =>
                        isActive
                            ? 'text-highlight dark:text-highlightDark hover:text-highlight dark:hover:text-highlightDark flex self-center cursor-pointer h-6 w-full'
                            : 'text-regularText dark:text-regularTextDark hover:text-regularText dark:hover:text-regularTextDark flex self-center cursor-pointer h-6 w-full '
                    }
                >
                    <MdOutlineDiversity3 size="1.5em" />
                </NavLink>
            </motion.button>
            <Tooltip
                id="navbar-friend-tooltip"
                style={{ fontSize: '0.75rem', zIndex: 99 }}
            />
        </>
    );
}
