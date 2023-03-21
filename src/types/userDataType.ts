export type UserDataType = {
    _id: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    friends: any[];
    posts: any[];
    bookmarks: any[];
    pending_friend_requests: any[];
    joined: Date;
    last_seen: Date;
    userpic: any;
};
