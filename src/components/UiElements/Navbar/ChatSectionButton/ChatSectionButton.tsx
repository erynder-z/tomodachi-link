import { MdOutlineChatBubbleOutline } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';
import useTheme from '../../../../hooks/useTheme';

type ChatSectionButtonProps = {
    isChatDisabled: boolean;
};

/**
 * React component for rendering a chat section button.
 *
 * @component
 * @param {ChatSectionButtonProps} props - The component props.
 * @param {boolean} props.isChatDisabled - Indicates whether the chat button is disabled.
 * @returns {JSX.Element} The rendered ChatSectionButton component.
 */
export default function ChatSectionButton({
    isChatDisabled,
}: ChatSectionButtonProps): JSX.Element {
    const { isMobileDevice } = useTheme();
    /**
     * JSX Element representing a disabled chat button.
     *
     * @type {JSX.Element}
     */
    const DisabledButton: JSX.Element = (
        <button
            type="button"
            disabled
            className="flex self-center cursor-not-allowed text-regularText dark:text-regularTextDark h-full w-full"
        >
            <MdOutlineChatBubbleOutline size="1.5em" />
        </button>
    );

    /**
     * JSX Element representing a normal chat button.
     *
     * @type {JSX.Element}
     */
    const NormalButton: JSX.Element = (
        <>
            <motion.button
                data-tooltip-id="navbar-chat-tooltip"
                data-tooltip-content="Go to chat"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
                data-tooltip-hidden={isMobileDevice}
                whileTap={{ scale: 0.97 }}
            >
                <NavLink
                    to="/chat"
                    className={({ isActive }) =>
                        isActive
                            ? 'text-highlight dark:text-highlightDark hover:text-highlight dark:hover:text-highlightDark flex self-center cursor-pointer h-6 w-full'
                            : 'text-regularText dark:text-regularTextDark hover:text-regularText dark:hover:text-regularTextDark flex self-center cursor-pointer h-6 w-full'
                    }
                >
                    <MdOutlineChatBubbleOutline size="1.5em" />
                </NavLink>
            </motion.button>
            <Tooltip id="navbar-chat-tooltip" style={{ fontSize: '0.75rem' }} />
        </>
    );

    /**
     * Render the chat button based on the provided props.
     *
     * @type {JSX.Element}
     */
    return isChatDisabled ? DisabledButton : NormalButton;
}
