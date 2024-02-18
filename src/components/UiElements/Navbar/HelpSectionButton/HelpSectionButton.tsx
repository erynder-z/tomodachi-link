import { MdOutlineHelpOutline } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';

/**
 * React component for rendering a help section button.
 *
 * @component
 * @returns {JSX.Element} The rendered HelpSectionButton component.
 */
export default function HelpSectionButton(): JSX.Element {
    /**
     * Render the HelpSectionButton component.
     *
     * @type {JSX.Element}
     */
    return (
        <>
            <motion.button
                data-tooltip-id="navbar-help-tooltip"
                data-tooltip-content="Go to help section"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
                whileTap={{ scale: 0.97 }}
            >
                <NavLink
                    to="/help"
                    className={({ isActive }) =>
                        isActive
                            ? 'text-highlight dark:text-highlightDark hover:text-highlight dark:hover:text-highlightDark flex self-center cursor-pointer h-6 w-full'
                            : 'text-regularText dark:text-regularTextDark hover:text-regularText dark:hover:text-regularTextDark flex self-center cursor-pointer h-6 w-full '
                    }
                >
                    <MdOutlineHelpOutline size="1.5em" />
                </NavLink>
            </motion.button>
            <Tooltip
                id="navbar-help-tooltip"
                style={{ fontSize: '0.75rem', zIndex: 99 }}
            />
        </>
    );
}
