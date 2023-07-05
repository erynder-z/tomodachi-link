import React from 'react';
import { FriendDataType } from '../../../../types/friendDataType';
import ChatUserListItem from './ChatUserListItem/ChatUserListItem';

type ChatUserListProps = {
    friendData: FriendDataType[] | null;
};

export default function ChatUserList({ friendData }: ChatUserListProps) {
    const userList = friendData?.map((friend) => (
        <ChatUserListItem key={friend._id} listItemData={friend} />
    ));

    return <div className="flex flex-col w-full">{userList}</div>;
}
