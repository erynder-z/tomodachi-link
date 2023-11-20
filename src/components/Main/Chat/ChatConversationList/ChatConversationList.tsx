import { ChatConversationType } from '../../../../types/chatTypes';
import ChatConversation from '../ChatConversation/ChatConversation';
import { motion } from 'framer-motion';

type ChatConversationListProps = {
    conversations: ChatConversationType[];
    conversationsWithUnreadMessages: string[];
    handleChatConversationClick: (conv: ChatConversationType) => void;
    currentUserId: string | undefined;
};

export default function ChatConversationList({
    conversations,
    conversationsWithUnreadMessages,
    handleChatConversationClick,
    currentUserId,
}: ChatConversationListProps) {
    const hasConversations = conversations?.length > 0;

    const ConversationContent = (
        <div className="flex md:flex-col gap-2 ls:gap-4 p-2 md:p-0 w-full overflow-y-auto lg:overflow-hidden">
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

    const NoConversationContent = (
        <span className="text-xs leading-tight p-2 flex text-center">
            Select a friend from the sidebar to initialize a conversation!
        </span>
    );
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="md:flex md:h-fit sticky top-0 md:top-2 flex-col gap-2 lg:gap-4 w-full lg:p-0 bg-card dark:bg-cardDark md:bg-background2 md:dark:bg-background2Dark text-regularText dark:text-regularTextDark z-10"
        >
            <h1 className="text-center font-bold">Conversations</h1>
            {hasConversations ? ConversationContent : NoConversationContent}
        </motion.div>
    );
}
