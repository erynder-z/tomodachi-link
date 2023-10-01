import { ImageType } from './miscTypes';

export type CommentType = {
    _id: string;
    parentItem: string;
    owner: {
        id: string;
        firstName: string;
        lastName: string;
        userpic: ImageType;
    };
    text: string;
    createdAt: Date;
    UpdatedAt: Date;
};
