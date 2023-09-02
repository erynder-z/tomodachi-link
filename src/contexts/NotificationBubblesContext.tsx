import { createContext, useEffect, useState } from 'react';
import { ChatConversationType } from '../types/chatConversationType';

type NotificationBubblesContextProps = {
    conversationsWithUnreadMessages: string[];
    setConversationsWithUnreadMessages: (
        conversations: string[] | ((prev: string[]) => string[])
    ) => void;
    mutedConversations: string[];
    setMutedConversations: (
        conversations: string[] | ((prev: string[]) => string[])
    ) => void;
    activeChat: ChatConversationType | null;
    setActiveChat: (chat: ChatConversationType | null) => void;
};
const NotificationBubblesContext =
    createContext<NotificationBubblesContextProps>({
        conversationsWithUnreadMessages: [],
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        setConversationsWithUnreadMessages: () => {},
        mutedConversations: [],
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        setMutedConversations: () => {},
        activeChat: null,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        setActiveChat: () => {},
    });

export function NotificationBubblesContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [
        conversationsWithUnreadMessages,
        setConversationsWithUnreadMessages,
    ] = useState<string[]>([]);
    const [mutedConversations, setMutedConversations] = useState<string[]>([]);
    const [activeChat, setActiveChat] = useState<ChatConversationType | null>(
        null
    );

    useEffect(() => {
        setConversationsWithUnreadMessages((prevUnreadMessages) =>
            prevUnreadMessages.filter((id) => id !== activeChat?._id)
        );
    }, [conversationsWithUnreadMessages.length]);

    const contextValue: NotificationBubblesContextProps = {
        conversationsWithUnreadMessages,
        setConversationsWithUnreadMessages,
        mutedConversations,
        setMutedConversations,
        activeChat,
        setActiveChat,
    };

    return (
        <NotificationBubblesContext.Provider value={contextValue}>
            {children}
        </NotificationBubblesContext.Provider>
    );
}

export default NotificationBubblesContext;
