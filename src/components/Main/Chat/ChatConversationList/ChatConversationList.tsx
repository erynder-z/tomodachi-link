import { ChatConversationType } from '../../../../types/chatTypes';
import ChatConversation from '../ChatConversation/ChatConversation';
import { motion } from 'framer-motion';

type ChatConversationListProps = {
    conversations: ChatConversationType[];
    conversationsWithUnreadMessages: string[];
    handleChatConversationClick: (conv: ChatConversationType) => void;
    currentUserId: string | undefined;
};

/**
 * ChatConversationList component for displaying a list of chat conversations.
 *
 * @component
 * @param {ChatConversationListProps} props - The props object.
 * @param {ChatConversationType[]} props.conversations - List of chat conversations.
 * @param {string[]} props.conversationsWithUnreadMessages - List of conversation IDs with unread messages.
 * @param {(conv: ChatConversationType) => void} props.handleChatConversationClick - Callback function when a conversation is clicked.
 * @param {string | undefined} props.currentUserId - ID of the current user.
 * @returns {JSX.Element} The rendered ChatConversationList component.
 */
export default function ChatConversationList({
    conversations,
    conversationsWithUnreadMessages,
    handleChatConversationClick,
    currentUserId,
}: ChatConversationListProps): JSX.Element {
    const hasConversations = conversations?.length > 0;

    /**
     * Content for rendering individual chat conversations.
     *
     * @type {JSX.Element}
     */
    const ConversationContent: JSX.Element = (
        <div className="flex md:flex-col gap-2 p-2 md:p-0 w-full">
            {conversations?.map((conv, index) => {
                const hasUnreadMessage =
                    conversationsWithUnreadMessages.includes(conv._id);
                const isMuted = conv.conversationStatus.some(
                    (status) =>
                        status.member === currentUserId &&
                        status.hasMutedConversation
                );
                return (
                    <div
                        onClick={() => handleChatConversationClick(conv)}
                        key={index}
                        className="relative cursor-pointer"
                    >
                        <ChatConversation
                            conversation={conv}
                            currentUserId={currentUserId}
                            hasUnreadMessage={hasUnreadMessage}
                            isMuted={isMuted}
                        />
                    </div>
                );
            })}
        </div>
    );

    /**
     * Content to display when no conversations are available.
     *
     * @type {JSX.Element}
     */
    const NoConversationContent: JSX.Element = (
        <span className="text-xs leading-tight p-2 flex text-center">
            Select a friend from the sidebar to initialize a conversation!
        </span>
    );

    /**
     * Renders the ChatConversationList component based on the presence of conversations.
     *
     * @return {JSX.Element} The rendered ChatConversationList component.
     */
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="md:flex md:h-fit sticky top-0 md:top-0 flex-col gap-2 lg:gap-4 w-full lg:p-0 bg-card dark:bg-cardDark md:bg-background2 md:dark:bg-background2Dark text-regularText dark:text-regularTextDark z-10"
        >
            <h1 className="mx-auto text-xl font-bold text-center py-1 px-4 w-full md:w-fit md:rounded-full bg-card dark:bg-cardDark md:bg-gray-300/80 md:dark:bg-gray-500/80">
                Chat
            </h1>
            {hasConversations ? ConversationContent : NoConversationContent}
        </motion.div>
    );
}
