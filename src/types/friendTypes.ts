import { ImageType } from './miscTypes';

export type FriendDataContextProviderProps = {
    children: React.ReactElement;
};

export type FriendDataContextProps = {
    friendData: FriendDataType[] | null;
    friendIDs: string[];
    setFriendData: (friendList: FriendDataType[] | null) => void;
    handleFetchFriendData: () => void;
};

export type FriendDataType = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    joined: Date;
    lastSeen: Date;
    userpic: ImageType;
    cover?: string;
};

export type FriendsOfFriendsType = {
    _id: string;
    firstName: string;
    lastName: string;
    userpic: ImageType;
    commonFriends: CommonFriendType[];
};

export type CommonFriendType = {
    _id: string;
    firstName: string;
    lastName: string;
};
