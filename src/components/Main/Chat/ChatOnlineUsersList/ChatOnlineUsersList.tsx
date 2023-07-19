import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner';
import { ChatMemberType } from '../../../../types/chatMemberType';
import { Socket } from 'socket.io-client';
import useFriendData from '../../../../hooks/useFriendData';
import ChatOnlineUserlistItem from './ChatOnlineUserlistItem/ChatOnlineUserlistItem';
import { FriendDataType } from '../../../../types/friendDataType';
import { ChatConversationType } from '../../../../types/chatConversationType';

type ChatOnlineUsersListProps = {
    socket: Socket | undefined;
    setActiveChat: React.Dispatch<
        React.SetStateAction<ChatConversationType | null>
    >;
};

export default function OnlineUsersList({
    socket,
    setActiveChat,
}: ChatOnlineUsersListProps) {
    const { friendData } = useFriendData();
    const [onlineUsers, setOnlineUsers] = useState<ChatMemberType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const isOnline = (user: FriendDataType) => {
        return onlineUsers?.some(
            (onlineUser) => onlineUser.userId === user._id
        );
    };

    useEffect(() => {
        socket?.on('getUsers', (users: ChatMemberType[]) => {
            setOnlineUsers(users);
            setLoading(false);
        });
    }, [socket, onlineUsers]);

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
            {loading ? (
                <div className="flex justify-center items-center w-full py-4">
                    <LoadingSpinner />
                </div>
            ) : (
                userList
            )}
        </div>
    );
}
