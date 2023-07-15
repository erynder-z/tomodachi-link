import React from 'react';
import { FriendDataType } from '../../../../types/friendDataType';
import ChatUserListItem from '../ChatConversationListItem/ChatConversationListItem';

type ChatConversationListProps = {
    friendData: FriendDataType[] | null;
};

export default function ChatConversationList({
    friendData,
}: ChatConversationListProps) {
    const userList = friendData?.map((friend) => (
        <ChatUserListItem key={friend._id} listItemData={friend} />
    ));

    return <div className="flex flex-col w-full">{userList}</div>;
}
