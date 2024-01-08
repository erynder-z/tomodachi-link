import { MdOutlineChatBubbleOutline } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';

type ChatSectionButtonProps = {
    isChatDisabled: boolean;
};

export default function ChatSectionButton({
    isChatDisabled,
}: ChatSectionButtonProps) {
    const DisabledButton = (
        <button
            type="button"
            disabled
            className="flex self-center cursor-not-allowed text-regularText dark:text-regularTextDark h-full w-full"
        >
            <MdOutlineChatBubbleOutline size="1.5em" />
        </button>
    );

    const NormalButton = (
        <>
            <motion.button
                data-tooltip-id="navbar-chat-tooltip"
                data-tooltip-content="Go to chat"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
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
    return isChatDisabled ? DisabledButton : NormalButton;
}
