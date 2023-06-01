import { ImageType } from './imageType';

export type FriendDataType = {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    joined: Date;
    lastSeen: Date;
    userpic: ImageType;
    cover?: string;
};
