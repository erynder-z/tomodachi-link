import { MdOutlineChatBubbleOutline } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

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
        <motion.button whileTap={{ scale: 0.97 }}>
            <NavLink
                to="/chat"
                className={({ isActive }) =>
                    isActive
                        ? 'text-highlight dark:text-highlightDark flex self-center cursor-pointer h-6 w-full duration-300'
                        : 'text-regularText dark:text-regularTextDark flex self-center cursor-pointer h-6 w-full'
                }
            >
                <MdOutlineChatBubbleOutline size="1.5em" />
            </NavLink>
        </motion.button>
    );
    return isChatDisabled ? DisabledButton : NormalButton;
}
