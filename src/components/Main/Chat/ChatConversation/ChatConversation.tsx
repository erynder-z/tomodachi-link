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
import { fetchChatPartnerData } from '../../../../utilities/fetchChatPartnerData';
import ChatConversationListItem from '../ChatConversationListItem/ChatConversationListItem';
import { handleConversationMuteBackend } from '../../../../utilities/handleConversationMuteBackend';
import useNotificationBubblesContext from '../../../../hooks/useNotificationBubblesContext';

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
                    const response = await fetchChatPartnerData(
                        token,
                        partnerId,
                        setInfo
                    );
                    setChatPartner(response);
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
        <div className="flex items-center w-full gap-2 md:gap-4 p-2 text-regularText dark:text-regularTextDark bg-background1 dark:bg-background1Dark md:bg-card md:dark:bg-cardDark hover:bg-cBlue dark:hover:bg-cBlue rounded-3xl">
            <ChatConversationListItem listItemData={chatPartner} />
            <div
                className="flex flex-col md:flex-row md:gap-2 "
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
                    <div className="flex justify-center items-center">
                        <div className="absolute md:static bottom-1 right-7 w-3 h-3 bg-highlight dark:bg-highlightDark rounded-full animate-pulse" />
                    </div>
                )}
            </div>
        </div>
    );

    return loading ? LoadingContent : ChatConversationContent;
}
