import { Socket, io } from 'socket.io-client';
import { CurrentUserDataType } from '../types/currentUserDataType';
import { DefaultEventsMap } from '@socket.io/component-emitter';

export const handleChatSetup = (
    socket: React.MutableRefObject<
        Socket<DefaultEventsMap, DefaultEventsMap> | undefined
    >,
    currentUserData: CurrentUserDataType,
    setUnreadMessages: React.Dispatch<React.SetStateAction<string[]>>
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
                setUnreadMessages((prevUnreadMessages) => {
                    const uniqueUnreadMessages = new Set(prevUnreadMessages);
                    uniqueUnreadMessages.add(data.conversationId);
                    return Array.from(uniqueUnreadMessages);
                });
            }
        );
    };

    connectToSocket();
    listenForUnreadMessages();

    if (socket.current && currentUserData) {
        addCurrentUserToChat();
    }

    return () => {
        socket.current?.disconnect();
    };
};
