export type ChatConversationType = {
    _id: string;
    members: string[];
    conversationStatus: {
        member: string;
        hasUnreadMessage: boolean;
        hasMutedConversation: boolean;
    }[];
    createdAt: Date;
    updatedAt: Date;
};

export type ChatMemberType = {
    socketId: string;
    userId: string;
};

export type DatabaseChatMessageType = {
    conversationId: string | undefined;
    senderId: string | undefined;
    text: string | undefined;
    createdAt?: Date;
    updatedAt?: Date;
};

export type DisplayChatMessageType = {
    senderId: string | undefined;
    text: string | undefined;
    createdAt?: Date;
};

export type SocketChatMessageType = {
    senderId: string;
    receiverId: string;
    conversationId: string | undefined;
    text: string;
};

export type SocketTypingIndicatorType = {
    senderId: string;
    receiverId: string;
};
