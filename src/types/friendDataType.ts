export type FriendDataType = {
    _id: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    joined: Date;
    last_seen: Date;
    userpic: {
        data: Buffer;
        contentType: string;
    };
};
