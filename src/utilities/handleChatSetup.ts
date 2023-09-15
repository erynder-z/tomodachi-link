import { Socket, io } from 'socket.io-client';
import { CurrentUserDataType } from '../types/currentUserDataType';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { fetchChatConversation } from './fetchChatConversation';
import { InfoType } from '../types/infoType';
import { ChatConversationType } from '../types/chatConversationType';

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
            try {
                const conversations: ChatConversationType[] =
                    await fetchChatConversation(token, setInfo);

                const conversationsWithUnreadMessages = conversations
                    .filter((conversation) =>
                        conversation.conversationStatus.some(
                            (status) =>
                                status.member === userId &&
                                status.hasUnreadMessage
                        )
                    )
                    .map((conversation) => conversation._id);

                const mutedConversations = conversations
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
