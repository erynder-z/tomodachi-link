export type ChatConversationType = {
    _id: string;
    members: string[];
    messageStatus: {
        member: string;
        hasUnreadMessage: boolean;
    }[];
    createdAt: Date;
    updatedAt: Date;
};
