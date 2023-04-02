export type CommentType = {
    parentPost: string;
    owner: {
        id: string;
        username: string;
        userpic: any;
    };
    timestamp: Date;
    text: string;
};
