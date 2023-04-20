import { FriendDataType } from './friendDataType';

export type UserPageDataTypes = {
    _id: string;
    first_name: string;
    last_name: string;
    username: string;
    userpic: {
        data: Buffer;
        contentType: string;
    };
    joined: Date;
    last_seen: Date;
    friends: FriendDataType[];
    posts: string[];
};
