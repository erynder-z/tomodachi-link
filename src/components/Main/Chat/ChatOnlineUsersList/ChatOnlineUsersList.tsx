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

/**
 * ChatOnlineUsersList component for displaying a list of online users.
 *
 * @component
 * @param {ChatOnlineUsersListProps} props - The props object.
 * @param {ChatMemberType[]} props.onlineUsers - Array of online users.
 * @param {boolean} props.loading - Indicates whether the online user list is still loading.
 * @returns {JSX.Element} The rendered ChatOnlineUsersList component.
 */
export default function ChatOnlineUsersList({
    onlineUsers,
    loading,
}: ChatOnlineUsersListProps): JSX.Element {
    const { friendData } = useFriendData();
    const { setActiveChat } = useNotificationBubblesContext();

    /**
     * Checks if a user is online based on the provided user data.
     *
     * @param {FriendDataType} user - The user data to check for online status.
     * @returns {boolean} Indicates whether the user is online.
     */
    const isOnline = (user: FriendDataType): boolean => {
        return onlineUsers?.some(
            (onlineUser) => onlineUser.userId === user._id
        );
    };

    /**
     * Filters out guest users from the list of friends.
     *
     * @type {FriendDataType[] | undefined}
     */
    const friendsWithoutGuestUser: FriendDataType[] | undefined =
        friendData?.filter((user) => user.accountType !== 'guest');

    /**
     * Generates a list of ChatOnlineUserlistItem components based on the filtered friends.
     *
     * @type {JSX.Element[] | undefined}
     */
    const userList: JSX.Element[] | undefined = friendsWithoutGuestUser?.map(
        (friend: FriendDataType) => (
            <ChatOnlineUserlistItem
                key={friend._id}
                listItemData={friend}
                isOnline={isOnline(friend)}
                setActiveChat={setActiveChat}
            />
        )
    );

    /**
     * Content to display while loading.
     *
     * @type {JSX.Element}
     */
    const LoadingContent: JSX.Element = (
        <div className="flex justify-center items-center w-full h-full py-4 ">
            <LoadingSpinner />
        </div>
    );

    /**
     * Content for the rendered ChatOnlineUsersList.
     *
     * @type {JSX.Element}
     */
    const OnlineUserListContent: JSX.Element = (
        <motion.div
            key="userList"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-[calc(100vh_-_5rem)] md:h-full w-full p-4 bg-card dark:bg-cardDark text-regularText dark:text-regularTextDark rounded lg:rounded-lg"
        >
            <h1 className="text-lg m-0 text-center font-bold">Friends</h1>
            <div className="overflow-auto flex flex-col flex-1">{userList}</div>
        </motion.div>
    );

    /**
     * Renders the ChatOnlineUsersList based on the loading state.
     *
     * @return {JSX.Element} The rendered ChatOnlineUsersList component.
     */
    return loading ? LoadingContent : OnlineUserListContent;
}
