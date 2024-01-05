import { MinimalUserTypes } from '../../../../types/otherUserTypes';
import { motion } from 'framer-motion';
import {
    MdOutlineNotifications,
    MdOutlineNotificationsOff,
} from 'react-icons/md';

type ChatConversationListItemProps = {
    listItemData: MinimalUserTypes | null;
    isConversationMuted: boolean;
    hasUnreadMessage: boolean;
    handleMuteConversation: () => void;
};

export default function ChatConversationListItem({
    listItemData,
    isConversationMuted,
    hasUnreadMessage,
    handleMuteConversation,
}: ChatConversationListItemProps) {
    const { firstName, lastName, userpic } = listItemData || {};

    const LoadingContent = (
        <div className="w-full flex items-center gap-2">
            <div className="w-8 h-8 object-cover rounded-full bg-gray-600/50 animate-pulse"></div>
            <div className="hidden md:block bg-gray-600/50 animate-pulse h-4 w-1/2"></div>
        </div>
    );

    const ChatConversationListItemContent = (
        <motion.div
            whileTap={{ scale: 0.97 }}
            className="flex justify-between items-center w-full"
        >
            <div className="flex justify-start items-center gap-2 w-full">
                <div className="relative flex">
                    <img
                        loading="lazy"
                        className="w-6 md:w-8 h-auto object-cover rounded-full"
                        src={`data:image/png;base64,${userpic}`}
                        alt="User avatar"
                    />
                    {hasUnreadMessage && !isConversationMuted && (
                        <div className="absolute -bottom-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute  h-full w-full rounded-full bg-regularText dark:bg-regularTextDark opacity-75"></span>
                            <span className="absolute rounded-full h-3 w-3 bg-highlight dark:bg-highlightDark"></span>
                        </div>
                    )}
                </div>
                <div className="hidden md:block flex-1 truncate text-xs">
                    {firstName} {lastName}
                </div>
            </div>
            <motion.div
                whileTap={{ scale: 0.97 }}
                className="flex flex-col md:flex-row justify-end md:gap-4 md:w-1/5"
                onClick={(e) => {
                    e.stopPropagation();
                    handleMuteConversation();
                }}
            >
                {isConversationMuted ? (
                    <MdOutlineNotificationsOff />
                ) : (
                    <MdOutlineNotifications />
                )}
            </motion.div>
        </motion.div>
    );

    return !listItemData ? LoadingContent : ChatConversationListItemContent;
}
