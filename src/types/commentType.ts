export type CommentType = {
    _id: string;
    parentPost: string;
    owner: {
        id: string;
        username: string;
        userpic: any;
    };
    timestamp: Date;
    text: string;
};
