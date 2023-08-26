export type ChatConversationType = {
    _id: string;
    members: string[];
    conversationStatus: {
        member: string;
        hasUnreadMessage: boolean;
    }[];
    createdAt: Date;
    updatedAt: Date;
};
