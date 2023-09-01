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
