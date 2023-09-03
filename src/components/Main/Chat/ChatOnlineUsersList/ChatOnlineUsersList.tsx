import React from 'react';
import { ChatMemberType } from '../../../../types/chatMemberType';
import useFriendData from '../../../../hooks/useFriendData';
import ChatOnlineUserlistItem from './ChatOnlineUserlistItem/ChatOnlineUserlistItem';
import { FriendDataType } from '../../../../types/friendDataType';
import useNotificationBubblesContext from '../../../../hooks/useNotificationBubblesContext';
import { motion } from 'framer-motion';

type ChatOnlineUsersListProps = {
    onlineUsers: ChatMemberType[];
};

export default function ChatOnlineUsersList({
    onlineUsers,
}: ChatOnlineUsersListProps) {
    const { friendData } = useFriendData();
    const { setActiveChat } = useNotificationBubblesContext();

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
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ once: true }}
            className="flex flex-col w-full p-4 bg-card dark:bg-cardDark text-regularText dark:text-regularTextDark"
        >
            <h1 className="text-center font-bold">Friends</h1>
            {userList}
        </motion.div>
    );
}
