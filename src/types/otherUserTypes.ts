import { FriendDataType } from './friendTypes';
import { ImageType } from './miscTypes';

export type OtherUserPageDataTypes = {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    userpic: ImageType;
    cover?: string;
    joined: Date;
    lastSeen: Date;
    friends: FriendDataType[];
    mutualFriends: number;
    posts: string[];
};

export type MinimalUserTypes = {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    userpic: {
        data: { data: Buffer };
        contentType: string;
    };
};
