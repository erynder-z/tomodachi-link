import { ImageType } from './imageType';

export type CommentType = {
    _id: string;
    parentPost: string;
    owner: {
        id: string;
        firstName: string;
        lastName: string;
        userpic: ImageType;
    };
    timestamp: Date;
    text: string;
};
