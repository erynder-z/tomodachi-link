import { useEffect, useRef, useState } from 'react';
import { ChatConversationType } from '../../../../types/chatTypes';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import LoadingSpinner from '../../../UiElements/LoadingSpinner/LoadingSpinner';
import {
    MdOutlineNotifications,
    MdOutlineNotificationsOff,
} from 'react-icons/md';
import { MinimalUserTypes } from '../../../../types/otherUserTypes';
import ChatConversationListItem from '../ChatConversationListItem/ChatConversationListItem';
import { handleConversationMuteBackend } from '../../../../utilities/handleConversationMuteBackend';
import useNotificationBubblesContext from '../../../../hooks/useNotificationBubblesContext';
import { backendFetch } from '../../../../utilities/backendFetch';
import { motion } from 'framer-motion';

type ChatConversationProps = {
    conversation: ChatConversationType;
    currentUserId: string | undefined;
    hasUnreadMessage: boolean;
    isMuted: boolean;
};

export default function ChatConversation({
    conversation,
    currentUserId,
    hasUnreadMessage,
    isMuted,
}: ChatConversationProps) {
    const { token } = useAuth();
    const { setInfo } = useInfoCard();
    const { mutedConversations, setMutedConversations } =
        useNotificationBubblesContext();
    const [chatPartner, setChatPartner] = useState<MinimalUserTypes | null>(
        null
    );
    const [loading, setLoading] = useState(false);
    const [isConversationMuted, setIsConversationMuted] = useState(isMuted);

    const shouldFetchPartnerData = useRef(true);

    const conversationId = conversation?._id;

    useEffect(() => {
        const partnerId = conversation.members.find(
            (member) => member !== currentUserId
        );
        if (partnerId && token) {
            const fetchPartnerData = async () => {
                try {
                    const API_ENDPOINT_URL = `/api/v1/chat/user/${partnerId}`;
                    const METHOD = 'GET';
                    const ERROR_MESSAGE = 'Unable to fetch user data!';

                    const response = await backendFetch(
                        token,
                        setInfo,
                        API_ENDPOINT_URL,
                        METHOD,
                        ERROR_MESSAGE
                    );
                    setChatPartner(response?.chatPartnerData);
                    setLoading(false);
                } catch (error) {
                    console.error(error);
                }
            };
            if (shouldFetchPartnerData.current) {
                fetchPartnerData();
            }
            return () => {
                shouldFetchPartnerData.current = false;
            };
        }
    }, [currentUserId, conversation, token, setInfo]);

    const handleMuteConversation = () => {
        setIsConversationMuted(!isConversationMuted);
        const updatedMutedConversations = isConversationMuted
            ? mutedConversations.filter((id) => id !== conversationId)
            : [...mutedConversations, conversationId];
        setMutedConversations(updatedMutedConversations);

        if (token && conversationId)
            handleConversationMuteBackend(token, conversationId, setInfo);
    };

    const LoadingContent = (
        <div className="flex flex-col gap-2 md:gap-4 h-44 md:p-4 lg:w-full lg:justify-around shadow-lg bg-card dark:bg-cardDark">
            <LoadingSpinner />
        </div>
    );

    const ChatConversationContent = (
        <div className="flex items-center justify-between w-20 md:w-full  py-2 px-2 md:px-4 text-regularText dark:text-regularTextDark bg-background1 dark:bg-background1Dark md:bg-card md:dark:bg-cardDark hover:bg-highlight dark:hover:bg-highlightDark duration-300 rounded-3xl">
            <ChatConversationListItem listItemData={chatPartner} />
            <motion.div
                whileTap={{ scale: 0.97 }}
                className="flex flex-col md:flex-row justify-end md:gap-4 md:w-16"
                onClick={(e) => {
                    e.stopPropagation();
                    handleMuteConversation();
                }}
            >
                {isConversationMuted ? (
                    <MdOutlineNotificationsOff />
                ) : (
                    <MdOutlineNotifications />
                )}

                {hasUnreadMessage && !isConversationMuted && (
                    <div className="absolute md:relative bottom-2 md:-bottom-0.5 right-10 md:right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-regularText dark:bg-regularTextDark opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-highlight dark:bg-highlightDark"></span>
                    </div>
                )}
            </motion.div>
        </div>
    );

    return loading ? LoadingContent : ChatConversationContent;
}
