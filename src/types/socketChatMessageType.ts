export type SocketChatMessageType = {
    senderId: string;
    receiverId: string;
    conversationId: string | undefined;
    text: string;
};
