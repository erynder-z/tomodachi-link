import { createContext, useEffect, useState } from 'react';
import { ChatConversationType } from '../types/chatConversationType';

type NotificationBubblesContextProviderProps = {
    children: React.ReactElement;
};

type NotificationBubblesContextProps = {
    conversationsWithUnreadMessages: string[];
    setConversationsWithUnreadMessages: (conversations: string[]) => void;
    activeChat: ChatConversationType | null;
    setActiveChat: (chat: ChatConversationType | null) => void;
};

const NotificationBubblesContext =
    createContext<NotificationBubblesContextProps>({
        conversationsWithUnreadMessages: [],
        // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
        setConversationsWithUnreadMessages: (conversations: string[]) => {},
        activeChat: null,
        // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
        setActiveChat: (chat: ChatConversationType | null) => {},
    });

export function NotificationBubblesContextProvider({
    children,
}: NotificationBubblesContextProviderProps) {
    const [
        conversationsWithUnreadMessages,
        setConversationsWithUnreadMessages,
    ] = useState<string[]>([]);
    const [activeChat, setActiveChat] = useState<ChatConversationType | null>(
        null
    );

    useEffect(() => {
        setConversationsWithUnreadMessages((prevUnreadMessages) =>
            prevUnreadMessages.filter((id) => id !== activeChat?._id)
        );
    }, [conversationsWithUnreadMessages.length]);

    return (
        <NotificationBubblesContext.Provider
            value={{
                conversationsWithUnreadMessages,
                setConversationsWithUnreadMessages,
                activeChat,
                setActiveChat,
            }}
        >
            {children}
        </NotificationBubblesContext.Provider>
    );
}

export default NotificationBubblesContext;
