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
        <div className="flex md:h-fit sticky top-0 md:top-2 md:flex-col overflow-y-auto lg:overflow-hidden gap-2 lg:gap-4 w-screen md:w-full p-2 lg:p-0 bg-canvas">
            <h1 className="text-center font-bold">Conversations</h1>
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
                            <div className="absolute bottom-2 md:inset-y-0 right-8 md:right-0 flex justify-center items-center mr-4">
                                <div className="w-3 h-3 bg-cPink rounded-full animate-pulse   " />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
