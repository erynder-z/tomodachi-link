import { createContext, useEffect, useState } from 'react';
import { ChatConversationType } from '../types/chatTypes';

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

/**
 * React context for managing and providing notification bubbles data.
 *
 * @context
 * @type {React.Context<NotificationBubblesContextProps>}
 */
const NotificationBubblesContext: React.Context<NotificationBubblesContextProps> =
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

/**
 * Component for providing the NotificationBubblesContext to the application.
 *
 * @component
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the context provider.
 * @returns {JSX.Element} The rendered NotificationBubblesContextProvider component.
 */
export function NotificationBubblesContextProvider({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    const [
        conversationsWithUnreadMessages,
        setConversationsWithUnreadMessages,
    ] = useState<string[]>([]);
    const [mutedConversations, setMutedConversations] = useState<string[]>([]);
    const [activeChat, setActiveChat] = useState<ChatConversationType | null>(
        null
    );

    /**
     * useEffect hook to filter out the active chat from conversations with unread messages.
     *
     * @effect
     * @returns {void}
     */
    useEffect(() => {
        setConversationsWithUnreadMessages((prevUnreadMessages) =>
            prevUnreadMessages?.filter((id) => id !== activeChat?._id)
        );
    }, [conversationsWithUnreadMessages?.length]);

    /**
     * Context value representing the state and functions for managing notification bubbles.
     *
     * @type {NotificationBubblesContextProps}
     */
    const contextValue: NotificationBubblesContextProps = {
        conversationsWithUnreadMessages,
        setConversationsWithUnreadMessages,
        mutedConversations,
        setMutedConversations,
        activeChat,
        setActiveChat,
    };

    /**
     * JSX Element representing the NotificationBubblesContextProvider with children components.
     *
     * @type {JSX.Element}
     */
    return (
        <NotificationBubblesContext.Provider value={contextValue}>
            {children}
        </NotificationBubblesContext.Provider>
    );
}

export default NotificationBubblesContext;
