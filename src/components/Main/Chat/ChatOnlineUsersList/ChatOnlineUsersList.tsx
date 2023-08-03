import React from 'react';
import { ChatMemberType } from '../../../../types/chatMemberType';
import useFriendData from '../../../../hooks/useFriendData';
import ChatOnlineUserlistItem from './ChatOnlineUserlistItem/ChatOnlineUserlistItem';
import { FriendDataType } from '../../../../types/friendDataType';
import { ChatConversationType } from '../../../../types/chatConversationType';

type ChatOnlineUsersListProps = {
    setActiveChat: React.Dispatch<
        React.SetStateAction<ChatConversationType | null>
    >;
    onlineUsers: ChatMemberType[];
};

export default function OnlineUsersList({
    setActiveChat,
    onlineUsers,
}: ChatOnlineUsersListProps) {
    const { friendData } = useFriendData();

    const isOnline = (user: FriendDataType) => {
        return onlineUsers?.some(
            (onlineUser) => onlineUser.userId === user._id
        );
    };

    const userList = friendData?.map((friend) => (
        <ChatOnlineUserlistItem
            key={friend._id}
            listItemData={friend}
            isOnline={isOnline(friend)}
            setActiveChat={setActiveChat}
        />
    ));

    return (
        <div className="flex flex-col w-full p-4 bg-canvas">
            <h1 className="text-center font-bold">Friends</h1>
            {userList}
        </div>
    );
}
