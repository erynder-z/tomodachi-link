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
        <div className="flex justify-center items-center w-full h-full py-4 ">
            <LoadingSpinner />
        </div>
    );

    const OnlineUserListContent = (
        <motion.div
            key="userList"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-[calc(100vh_-_5rem)] md:h-full w-full p-4 bg-card dark:bg-cardDark text-regularText dark:text-regularTextDark rounded lg:rounded-lg"
        >
            <h1 className="text-center font-bold">Friends</h1>
            <div className="overflow-auto flex flex-col gap-2 md:gap-3 flex-1">
                {userList}
            </div>
        </motion.div>
    );

    return loading ? LoadingContent : OnlineUserListContent;
}
