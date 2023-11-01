import { ChatMemberType } from '../../../../types/chatTypes';
import useFriendData from '../../../../hooks/useFriendData';
import ChatOnlineUserlistItem from './ChatOnlineUserlistItem/ChatOnlineUserlistItem';
import { FriendDataType } from '../../../../types/friendTypes';
import useNotificationBubblesContext from '../../../../hooks/useNotificationBubblesContext';
import { motion } from 'framer-motion';
import LoadingSpinner from '../../../UiElements/LoadingSpinner/LoadingSpinner';

type ChatOnlineUsersListProps = {
    onlineUsers: ChatMemberType[];
    loading: boolean;
};

export default function ChatOnlineUsersList({
    onlineUsers,
    loading,
}: ChatOnlineUsersListProps) {
    const { friendData } = useFriendData();
    const { setActiveChat } = useNotificationBubblesContext();

    const isOnline = (user: FriendDataType) => {
        return onlineUsers?.some(
            (onlineUser) => onlineUser.userId === user._id
        );
    };

    const friendsWithoutGuestUser = friendData?.filter(
        (user) => user.accountType !== 'guest'
    );

    const userList = friendsWithoutGuestUser?.map((friend: FriendDataType) => (
        <ChatOnlineUserlistItem
            key={friend._id}
            listItemData={friend}
            isOnline={isOnline(friend)}
            setActiveChat={setActiveChat}
        />
    ));

    const LoadingContent = (
        <div className="flex justify-center items-center w-full h-[calc(100vh_-_3rem)] py-4 ">
            <LoadingSpinner />
        </div>
    );

    const OnlineUserListContent = (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col w-full p-4 bg-card dark:bg-cardDark text-regularText dark:text-regularTextDark"
        >
            <h1 className="text-center font-bold">Friends</h1>
            {userList}
        </motion.div>
    );

    return loading ? LoadingContent : OnlineUserListContent;
}
