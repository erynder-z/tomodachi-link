import { MdPieChartOutlined } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';
import useTheme from '../../../../hooks/useTheme';

/**
 * React component for rendering the button to navigate to the poll section in the navbar.
 *
 * @component
 * @returns {JSX.Element} The rendered PollSectionButton component.
 */
export default function PollSectionButton(): JSX.Element {
    const { isMobileDevice } = useTheme();
    /**
     * Render the PollSectionButton component.
     *
     * @type {JSX.Element}
     */
    return (
        <>
            <motion.button
                data-tooltip-id="navbar-poll-tooltip"
                data-tooltip-content="Go to poll section"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
                data-tooltip-hidden={isMobileDevice}
                whileTap={{ scale: 0.97 }}
            >
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
            <Tooltip
                id="navbar-poll-tooltip"
                style={{ fontSize: '0.75rem', zIndex: 99 }}
            />
        </>
    );
}
