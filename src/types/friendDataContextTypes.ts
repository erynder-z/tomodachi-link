import { FriendDataType } from './friendDataType';

export type FriendDataContextProviderProps = {
    children: React.ReactElement;
};

export type FriendDataContextProps = {
    friendData: FriendDataType[] | null;
    setFriendData: (friendList: FriendDataType[] | null) => void;
    handleFetchFriendData: () => void;
};
