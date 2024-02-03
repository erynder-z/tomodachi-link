import { Socket, io } from 'socket.io-client';
import { CurrentUserDataType } from '../types/currentUserTypes';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { InfoType } from '../types/infoTypes';
import { ChatConversationType } from '../types/chatTypes';
import { backendFetch } from './backendFetch';

/**
 * Handles the setup for chat functionality, including connecting to the socket, adding the current user to the chat,
 * updating conversations, and listening for unread messages.
 *
 * @param {React.MutableRefObject<Socket<DefaultEventsMap, DefaultEventsMap> | undefined>} socket - Mutable ref for the socket instance.
 * @param {string | null} token - User authentication token.
 * @param {CurrentUserDataType} currentUserData - Data of the current user.
 * @param {(conversations: string[] | ((prev: string[]) => string[])) => void} setConversationsWithUnreadMessages - Function to set conversations with unread messages.
 * @param {(conversations: string[] | ((prev: string[]) => string[])) => void} setMutedConversations - Function to set muted conversations.
 * @param {(info: InfoType | null) => void} setInfo - Function to set information card state.
 *
 * @returns {() => void} - Cleanup function to disconnect the socket when the component unmounts.
 */
export const handleChatSetup = (
    socket: React.MutableRefObject<
        Socket<DefaultEventsMap, DefaultEventsMap> | undefined
    >,
    token: string | null,
    currentUserData: CurrentUserDataType,
    setConversationsWithUnreadMessages: (
        conversations: string[] | ((prev: string[]) => string[])
    ) => void,
    setMutedConversations: (
        conversations: string[] | ((prev: string[]) => string[])
    ) => void,
    setInfo: (info: InfoType | null) => void
): (() => void) => {
    const serverURL = import.meta.env.VITE_SERVER_URL;

    /**
     * Connects to the Socket.io server.
     *
     * @function
     * @returns {Socket<DefaultEventsMap, DefaultEventsMap>}
     */
    const connectToSocket = (): Socket<DefaultEventsMap, DefaultEventsMap> =>
        (socket.current = io(serverURL));

    /**
     * Adds the current user to the chat upon connection.
     *
     * @function
     * @returns {void}
     */
    const addCurrentUserToChat = (): void => {
        const userId = currentUserData?._id;
        socket.current?.emit('addUser', userId);
    };

    /**
     * Updates the user's conversations with unread messages and muted conversations.
     *
     * @function
     * @returns {Promise<void>} A promise that resolves when the conversations have been fetched.
     */
    const updateConversations = async (): Promise<void> => {
        setConversationsWithUnreadMessages([]);
        setMutedConversations([]);

        const userId = currentUserData._id;

        if (userId && token) {
            const API_ENDPOINT_URL = '/api/v1/chat/';
            const METHOD = 'GET';
            const ERROR_MESSAGE = 'Unable to fetch conversation!';

            try {
                const response: { conversation: ChatConversationType[] } =
                    await backendFetch(
                        token,
                        setInfo,
                        API_ENDPOINT_URL,
                        METHOD,
                        ERROR_MESSAGE
                    );
                const conversationsWithUnreadMessages = response?.conversation
                    .filter((conversation) =>
                        conversation.conversationStatus.some(
                            (status) =>
                                status.member === userId &&
                                status.hasUnreadMessage
                        )
                    )
                    .map((conversation) => conversation._id);

                const mutedConversations = response?.conversation
                    .filter((conversation) =>
                        conversation.conversationStatus.some(
                            (status) =>
                                status.member === userId &&
                                status.hasMutedConversation
                        )
                    )
                    .map((conversation) => conversation._id);

                setConversationsWithUnreadMessages(
                    conversationsWithUnreadMessages
                );
                setMutedConversations(mutedConversations);
            } catch (error) {
                return;
            }
        }
    };

    /**
     * Listens for unread message notifications from the Socket.io server.
     *
     * @function
     * @returns {void}
     */
    const listenForUnreadMessages = (): void => {
        socket?.current?.on(
            'notifyUnreadMessage',
            (data: { conversationId: string }) => {
                const conversations = (prevUnreadMessages: string[]) => {
                    const uniqueUnreadMessages = new Set(prevUnreadMessages);
                    uniqueUnreadMessages.add(data.conversationId);
                    return Array.from(uniqueUnreadMessages);
                };
                setConversationsWithUnreadMessages(conversations);
            }
        );
    };

    // Initial setup
    connectToSocket();
    listenForUnreadMessages();
    updateConversations();
    if (socket.current && currentUserData) addCurrentUserToChat();

    /**
     * Disconnects the Socket when cleanup is required.
     *
     * @returns {void}
     */
    return (): void => {
        socket.current?.disconnect();
    };
};
