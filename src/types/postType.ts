import { CommentType } from './commentType';

export type PostType = {
    _id: string;
    owner: {
        id: string;
        firstName: string;
        lastName: string;
        userpic: any;
    };
    timestamp: Date;
    text: string;
    image?: any;
    embeddedVideoID?: string;
    comments: CommentType[];
    reactions: { positive: number; negative: number };
};
