import { CommentType } from './commentType';
import { ImageType } from './imageType';

export type PostType = {
    _id: string;
    owner: {
        _id: string;
        firstName: string;
        lastName: string;
        userpic: ImageType;
    };
    timestamp: Date;
    text: string;
    image?: any;
    gifUrl: string;
    embeddedVideoID?: string;
    comments: CommentType[];
    reactions: { positive: number; negative: number };
};
