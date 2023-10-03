import { Socket, io } from 'socket.io-client';
import { CurrentUserDataType } from '../types/currentUserTypes';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { InfoType } from '../types/infoTypes';
import { ChatConversationType } from '../types/chatTypes';
import { backendFetch } from './backendFetch';

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
) => {
    const serverURL = import.meta.env.VITE_SERVER_URL;

    const connectToSocket = () => (socket.current = io(serverURL));
    const addCurrentUserToChat = () => {
        const userId = currentUserData?._id;
        socket.current?.emit('addUser', userId);
    };

    const updateConversations = async () => {
        setConversationsWithUnreadMessages([]);
        setMutedConversations([]);

        const userId = currentUserData._id;

        if (userId && token) {
            const apiEndpointURL = '/api/v1/chat/';
            const method = 'GET';
            const errorMessage = 'Unable to fetch conversation!';

            try {
                const response: { conversation: ChatConversationType[] } =
                    await backendFetch(
                        token,
                        setInfo,
                        apiEndpointURL,
                        method,
                        errorMessage
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

    const listenForUnreadMessages = () => {
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

    connectToSocket();
    listenForUnreadMessages();
    updateConversations();

    if (socket.current && currentUserData) addCurrentUserToChat();

    return () => {
        socket.current?.disconnect();
    };
};
