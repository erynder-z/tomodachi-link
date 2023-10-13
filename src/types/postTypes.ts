import { CommentType } from './commentTypes';
import { ImageType } from './miscTypes';

export type PostType = {
    _id: string;
    owner: {
        _id: string;
        firstName: string;
        lastName: string;
        userpic: ImageType;
    };
    text: string;
    image?: any;
    gifUrl: string;
    embeddedVideoID?: string;
    comments: CommentType[];
    reactions: { positive: number; negative: number };
    createdAt: Date;
    updatedAt: Date;
};

export type MinimalPostType = {
    _id: string;
    owner: { _id: string };
    createdAt: Date;
    updatedAt: Date;
};
