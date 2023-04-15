export type UserDataType = {
    _id: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    friends: string[];
    posts: string[];
    bookmarks: string[];
    pending_friend_requests: string[];
    joined: Date;
    last_seen: Date;
    userpic: {
        data: Buffer;
        contentType: string;
    };
};
