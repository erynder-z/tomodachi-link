import React from 'react';
import { TbLink, TbUserMinus, TbMessage } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuth from '../../../../../hooks/useAuth';
import useCurrentUserData from '../../../../../hooks/useCurrentUserData';
import { fetchChatConversation } from '../../../../../utilities/fetchChatConversation';
import useInfoCard from '../../../../../hooks/useInfoCard';
import { ChatConversationType } from '../../../../../types/chatConversationType';
import { handleInitializeChat } from '../../../../../utilities/handleInitializeChat';

type FriendCardMenuProps = {
    id: string;
    firstName: string;
    setActiveChat: React.Dispatch<
        React.SetStateAction<ChatConversationType | null>
    >;
    handleUnfriendButtonClick: () => void;
};

export default function FriendCardMenu({
    id,
    firstName,
    setActiveChat,
    handleUnfriendButtonClick,
}: FriendCardMenuProps) {
    const { token } = useAuth();
    const { setInfo } = useInfoCard();
    const { currentUserData } = useCurrentUserData();
    const navigate = useNavigate();

    const currentUserId = currentUserData?._id;

    const handleChatButtonClick = async () => {
        if (currentUserId && token) {
            const conversationList = await fetchChatConversation(
                token,
                setInfo
            );
            const conversationWithCurrentFriend = conversationList.find(
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

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-2 justify-around items-center"
        >
            <Link
                to={`/users/${id}`}
                className="flex justify-between items-center w-full text-left text-regularText dark:text-regularTextDark group"
            >
                <span className="group-hover:text-yellow-300 group-hover:dark:text-yellow-300 transition-all">
                    Visit page
                </span>
                <div className="flex items-center h-8 gap-4 py-2 text-regularText dark:text-regularTextDark text-xl group-hover:text-yellow-300 group-hover:dark:text-yellow-300 transition-all">
                    <TbLink />
                </div>
            </Link>
            <button
                className="flex justify-between items-center w-full text-left text-regularText dark:text-regularTextDark group"
                onClick={handleChatButtonClick}
            >
                <span className="group-hover:text-yellow-300 group-hover:dark:text-yellow-300 transition-all leading-tight">
                    Chat with {firstName}
                </span>
                <div className="flex items-center h-8 gap-4 py-2 text-regularText dark:text-regularTextDark text-xl group-hover:text-yellow-300 group-hover:dark:text-yellow-300 transition-all">
                    <TbMessage />
                </div>
            </button>
            <button
                className="flex justify-between items-center w-full text-left cursor-pointer group"
                onClick={handleUnfriendButtonClick}
            >
                <span className="group-hover:text-yellow-300 group-hover:dark:text-yellow-300 transition-all">
                    Unfriend
                </span>
                <TbUserMinus className="h-8 text-regularText dark:text-regularTextDark text-xl group-hover:text-yellow-300 group-hover:dark:text-yellow-300 transition-all" />
            </button>
        </motion.div>
    );
}
