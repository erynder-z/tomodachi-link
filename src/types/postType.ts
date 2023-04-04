import { CommentType } from './commentType';

export type PostType = {
    _id: string;
    owner: {
        id: string;
        username: string;
        userpic: any;
    };
    timestamp: Date;
    text: string;
    image?: any;
    comments: CommentType[];
    reactions: { positive: number; negative: number };
};
