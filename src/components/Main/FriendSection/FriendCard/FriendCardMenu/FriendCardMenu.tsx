import { TbLink, TbUserMinus, TbMessage } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuth from '../../../../../hooks/useAuth';
import useCurrentUserData from '../../../../../hooks/useCurrentUserData';
import useInfoCard from '../../../../../hooks/useInfoCard';
import { ChatConversationType } from '../../../../../types/chatTypes';
import { handleInitializeChat } from '../../../../../utilities/handleInitializeChat';
import { backendFetch } from '../../../../../utilities/backendFetch';

type FriendCardMenuProps = {
    id: string;
    firstName: string;
    accountType: 'guest' | 'regularUser';
    setActiveChat: (chat: ChatConversationType) => void;
    handleUnfriendButtonClick: () => void;
};

/**
 * FriendCardMenu component to display a menu for interacting with a friend.
 *
 * @component
 * @param {FriendCardMenuProps} props - The props object.
 * @param {string} props.id - The ID of the friend.
 * @param {string} props.firstName - The first name of the friend.
 * @param {Function} props.setActiveChat - Function to set the active chat.
 * @param {Function} props.handleUnfriendButtonClick - Function to handle the unfriend button click.
 * @return {JSX.Element} The rendered FriendCardMenu component.
 */
export default function FriendCardMenu({
    id,
    firstName,
    accountType,
    setActiveChat,
    handleUnfriendButtonClick,
}: FriendCardMenuProps): JSX.Element {
    const { token } = useAuth();
    const { setInfo } = useInfoCard();
    const { currentUserData } = useCurrentUserData();
    const navigate = useNavigate();

    const currentUserId = currentUserData?._id;

    /**
     * Function to handle the chat button click and initialize or navigate to a conversation.
     *
     * @function
     * @async
     * @return {Promise<void>} A promise representing the completion of the function.
     */
    const handleChatButtonClick = async (): Promise<void> => {
        if (currentUserId && token) {
            const API_ENDPOINT_URL = '/api/v1/chat/';
            const METHOD = 'GET';
            const ERROR_MESSAGE = 'Unable to fetch conversation!';

            const response = await backendFetch(
                token,
                setInfo,
                API_ENDPOINT_URL,
                METHOD,
                ERROR_MESSAGE
            );
            const conversationWithCurrentFriend = response?.conversation.find(
                (conversation: ChatConversationType) => {
                    const members = conversation.members;
                    return (
                        members.includes(id) && members.includes(currentUserId)
                    );
                }
            );
            if (conversationWithCurrentFriend === undefined) {
                handleInitializeChat(token, setInfo, id, setActiveChat);
            } else {
                setActiveChat(conversationWithCurrentFriend);
            }
            navigate('/chat');
        }
    };

    /**
     * JSX element for the "Link to User" button.
     *
     * @type {JSX.Element}
     */
    const LinkToUser: JSX.Element = (
        <motion.button whileTap={{ scale: 0.97 }} className="w-full">
            <Link
                to={`/users/${id}`}
                className="flex justify-between items-center w-full text-left group text-regularText dark:text-regularTextDark"
            >
                <span className="group-hover:text-yellow-300 group-hover:dark:text-yellow-300 transition-all">
                    Visit page
                </span>
                <div className="flex items-center h-8 gap-4 py-2 text-xl group-hover:text-yellow-300 group-hover:dark:text-yellow-300 transition-all">
                    <TbLink />
                </div>
            </Link>
        </motion.button>
    );

    /**
     * JSX element for the "Chat with User" button.
     *
     * @type {JSX.Element}
     */
    const ChatWithUser: JSX.Element = (
        <motion.button
            whileTap={{ scale: 0.97 }}
            className="flex justify-between items-center w-full text-left group"
            onClick={handleChatButtonClick}
            disabled={accountType === 'guest'}
        >
            <span className="group-hover:text-yellow-300 group-hover:dark:text-yellow-300 transition-all leading-tight">
                Chat with {firstName}
            </span>
            <div className="flex items-center h-8 gap-4 py-2  text-xl group-hover:text-yellow-300 group-hover:dark:text-yellow-300 transition-all">
                <TbMessage />
            </div>
        </motion.button>
    );

    /**
     * JSX element for the "Unfriend" button.
     *
     * @type {JSX.Element}
     */
    const Unfriend: JSX.Element = (
        <motion.button
            whileTap={{ scale: 0.97 }}
            className="flex justify-between items-center w-full text-left cursor-pointer group"
            onClick={handleUnfriendButtonClick}
        >
            <span className="group-hover:text-yellow-300 group-hover:dark:text-yellow-300 transition-all">
                Unfriend
            </span>
            <TbUserMinus className="h-8  text-xl group-hover:text-yellow-300 group-hover:dark:text-yellow-300 transition-all" />
        </motion.button>
    );

    /**
     * The rendered FriendCardMenu component.
     *
     * @type {JSX.Element}
     */
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-2 justify-around items-center text-regularText dark:text-regularTextDark"
        >
            {LinkToUser}
            {accountType !== 'guest' && ChatWithUser}
            {Unfriend}
        </motion.div>
    );
}
