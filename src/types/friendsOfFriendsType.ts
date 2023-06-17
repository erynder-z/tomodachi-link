export type FriendsOfFriendsType = {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    userpic: {
        data: {
            data: Buffer;
        };
        contentType: string;
    };
    commonFriends: CommonFriendType[];
};

export type CommonFriendType = {
    _id: string;
    firstName: string;
    lastName: string;
};
