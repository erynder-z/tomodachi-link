import { MinimalUserTypes } from '../../../../types/otherUserTypes';
import { motion } from 'framer-motion';
import {
    MdOutlineNotifications,
    MdOutlineNotificationsOff,
} from 'react-icons/md';
import { Tooltip } from 'react-tooltip';

type ChatConversationListItemProps = {
    listItemData: MinimalUserTypes | null;
    isConversationMuted: boolean;
    hasUnreadMessage: boolean;
    handleMuteConversation: () => void;
};

/**
 * ChatConversationListItem component for displaying an individual chat conversation in the conversation list.
 *
 * @component
 * @param {ChatConversationListItemProps} props - The props object.
 * @param {MinimalUserTypes | null} props.listItemData - Data of the user associated with the conversation item.
 * @param {boolean} props.isConversationMuted - Indicates whether the conversation is muted.
 * @param {boolean} props.hasUnreadMessage - Indicates whether the conversation has unread messages.
 * @param {() => void} props.handleMuteConversation - Callback function to handle muting/unmuting the conversation.
 * @returns {JSX.Element} The rendered ChatConversationListItem component.
 */
export default function ChatConversationListItem({
    listItemData,
    isConversationMuted,
    hasUnreadMessage,
    handleMuteConversation,
}: ChatConversationListItemProps): JSX.Element {
    const { firstName, lastName, userpic } = listItemData || {};

    /**
     * Content to display while loading.
     *
     * @type {JSX.Element}
     */
    const LoadingContent: JSX.Element = (
        <div className="w-full flex items-center gap-2">
            <div className="w-8 h-8 object-cover rounded-full bg-gray-600/50 animate-pulse"></div>
            <div className="hidden md:block bg-gray-600/50 animate-pulse h-4 w-1/2"></div>
        </div>
    );

    /**
     * Content for the rendered ChatConversationListItem.
     *
     * @type {JSX.Element}
     */
    const ChatConversationListItemContent: JSX.Element = (
        <>
            <motion.div
                whileTap={{ scale: 0.97 }}
                className="flex justify-between items-center w-full"
            >
                <div
                    data-tooltip-id="chat-conversation-list-tooltip"
                    data-tooltip-content="Show conversation"
                    data-tooltip-variant="dark"
                    data-tooltip-delay-show={500}
                    className="flex justify-start items-center gap-2 w-full"
                >
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
                    <Tooltip
                        id="chat-conversation-list-tooltip"
                        style={{ fontSize: '0.75rem', zIndex: 99 }}
                    />
                </div>
                <motion.div
                    data-tooltip-id="chat-conversation-mute-tooltip"
                    data-tooltip-content={
                        isConversationMuted
                            ? 'Unmute conversation'
                            : 'Mute conversation'
                    }
                    data-tooltip-variant="dark"
                    data-tooltip-delay-show={500}
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
                <Tooltip
                    id="chat-conversation-mute-tooltip"
                    style={{ fontSize: '0.75rem', zIndex: 99 }}
                />
            </motion.div>
        </>
    );

    /**
     * Renders the ChatConversationListItem based on the loading state.
     *
     * @return {JSX.Element} The rendered ChatConversationListItem component.
     */
    return !listItemData ? LoadingContent : ChatConversationListItemContent;
}
