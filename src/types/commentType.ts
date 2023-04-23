export type CommentType = {
    _id: string;
    parentPost: string;
    owner: {
        id: string;
        firstName: string;
        lastName: string;
        userpic: any;
    };
    timestamp: Date;
    text: string;
};
