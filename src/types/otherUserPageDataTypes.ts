import { FriendDataType } from './friendDataType';

export type OtherUserPageDataTypes = {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    userpic: {
        data: Buffer;
        contentType: string;
    };
    joined: Date;
    lastSeen: Date;
    friends: FriendDataType[];
    mutualFriends: number;
    posts: string[];
};
