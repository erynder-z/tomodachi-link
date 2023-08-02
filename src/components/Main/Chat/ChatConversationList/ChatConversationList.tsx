import React from 'react';
import { ChatConversationType } from '../../../../types/chatConversationType';
import ChatConversation from '../ChatConversation/ChatConversation';

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
    return (
        <div>
            {conversations.map((conv, index) => {
                const hasUnreadMessage =
                    conversationsWithUnreadMessages.includes(conv._id);
                return (
                    <div
                        onClick={() => handleChatConversationClick(conv)}
                        key={index}
                        className="relative cursor-pointer animate-popInAnimation"
                    >
                        <ChatConversation
                            conversation={conv}
                            currentUserId={currentUserId}
                        />
                        {hasUnreadMessage && (
                            <div className="absolute bottom-4 right-8">
                                <div className="w-2 h-2 bg-red-600 rounded-full" />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
