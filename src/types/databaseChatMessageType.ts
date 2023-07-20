export type DatabaseChatMessageType = {
    conversationId: string | undefined;
    senderId: string | undefined;
    text: string | undefined;
    createdAt?: Date;
    updatedAt?: Date;
};
