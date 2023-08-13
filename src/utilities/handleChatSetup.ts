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
    setConversationsWithUnreadMessages: React.Dispatch<
        React.SetStateAction<string[]>
    >,
    setInfo: (info: InfoType | null) => void
) => {
    const connectToSocket = () => {
        const serverURL = import.meta.env.VITE_SERVER_URL;
        socket.current = io(serverURL);
    };

    const addCurrentUserToChat = () => {
        const userId = currentUserData?._id;
        socket?.current?.emit('addUser', userId);
    };

    const listenForUnreadMessages = () => {
        socket?.current?.on(
            'notifyUnreadMessage',
            (data: { conversationId: string }) => {
                setConversationsWithUnreadMessages((prevUnreadMessages) => {
                    const uniqueUnreadMessages = new Set(prevUnreadMessages);
                    uniqueUnreadMessages.add(data.conversationId);
                    return Array.from(uniqueUnreadMessages);
                });
            }
        );
    };

    const checkForUnreadOfflineMessages = () => {
        const getConversations = async () => {
            const userId = currentUserData._id;
            if (userId && token) {
                const conversations: ChatConversationType[] =
                    await fetchChatConversation(token, setInfo);

                const conversationsWithUnreadMessages = conversations
                    .filter((conversation) =>
                        conversation.messageStatus.some(
                            (status) =>
                                status.member === userId &&
                                status.hasUnreadMessage
                        )
                    )
                    .map((conversation) => conversation._id);

                setConversationsWithUnreadMessages(
                    conversationsWithUnreadMessages
                );
            }
        };
        getConversations();
    };

    connectToSocket();
    listenForUnreadMessages();
    checkForUnreadOfflineMessages();

    if (socket.current && currentUserData) {
        addCurrentUserToChat();
    }

    return () => {
        socket.current?.disconnect();
    };
};
