import { FriendDataType } from './friendDataType';
import { ImageType } from './imageType';

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
