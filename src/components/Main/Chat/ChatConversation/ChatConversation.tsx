import React, { useEffect, useState } from 'react';
import { ChatConversationType } from '../../../../types/chatConversationType';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import LoadingSpinner from '../../../UiElements/LoadingSpinner/LoadingSpinner';
import {
    MdOutlineNotifications,
    MdOutlineNotificationsOff,
} from 'react-icons/md';
import { MinimalUserTypes } from '../../../../types/minimalUserTypes';
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

            fetchPartnerData();
        }
    }, [currentUserId, conversation, token, setInfo]);

    const handleMuteConversation = () => {
        setIsConversationMuted(!isConversationMuted);
        const updatedMutedConversations = isConversationMuted
            ? mutedConversations.filter((id) => id !== conversationId)
            : [...mutedConversations, conversationId];
        setMutedConversations(updatedMutedConversations);

        if (token && conversationId) {
            handleConversationMuteBackend(token, conversationId, setInfo);
        }
    };

    const LoadingContent = (
        <div className="flex flex-col gap-4 h-44 md:p-4 lg:w-full lg:justify-around shadow-lg bg-card dark:bg-cardDark">
            <LoadingSpinner />
        </div>
    );

    const ChatConversationContent = (
        <div className="flex items-center w-full gap-4 p-2 text-regularText dark:text-regularTextDark bg-card dark:bg-cardDark hover:bg-cBlue dark:hover:bg-cBlue rounded-3xl">
            <ChatConversationListItem listItemData={chatPartner} />
            <div className="flex gap-2">
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        handleMuteConversation();
                    }}
                    className="-translate-x-6 -translate-y-3 md:-translate-x-0 md:translate-y-0 flex justify-center items-center"
                >
                    {isConversationMuted ? (
                        <MdOutlineNotificationsOff />
                    ) : (
                        <MdOutlineNotifications />
                    )}
                </div>
                {hasUnreadMessage && !isConversationMuted && (
                    <div className="-translate-x-12 translate-y-3 md:-translate-x-0 md:translate-y-0 flex justify-center items-center mr-4">
                        <div className="w-3 h-3 bg-highlight dark:bg-highlightDark rounded-full animate-pulse" />
                    </div>
                )}
            </div>
        </div>
    );

    return loading ? LoadingContent : ChatConversationContent;
}
