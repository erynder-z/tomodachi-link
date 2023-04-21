export type UserDataType = {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    friends: string[];
    posts: string[];
    bookmarks: string[];
    pending_friend_requests: string[];
    joined: Date;
    lastSeen: Date;
    userpic: {
        data: Buffer;
        contentType: string;
    };
};
