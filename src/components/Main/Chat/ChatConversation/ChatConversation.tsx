import React, { useEffect, useState } from 'react';
import { ChatConversationType } from '../../../../types/chatConversationType';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import LoadingSpinner from '../../../UiElements/LoadingSpinner/LoadingSpinner';
import { MinimalUserTypes } from '../../../../types/minimalUserTypes';
import { fetchChatPartnerData } from '../../../../utilities/fetchChatPartnerData';
import ChatConversationListItem from '../ChatConversationListItem/ChatConversationListItem';

type ChatConversationProps = {
    conversation: ChatConversationType;
    currentUserId: string | undefined;
    hasUnreadMessage: boolean;
};

export default function ChatConversation({
    conversation,
    currentUserId,
    hasUnreadMessage,
}: ChatConversationProps) {
    const { token } = useAuth();
    const { setInfo } = useInfoCard();
    const [chatPartner, setChatPartner] = useState<MinimalUserTypes | null>(
        null
    );
    const [loading, setLoading] = useState<boolean>(false);

    const handleFetchPartnerData = async (partnerId: string) => {
        if (token) {
            const response = await fetchChatPartnerData(
                token,
                partnerId,
                setInfo
            );
            setChatPartner(response);
            setLoading(false);
        }
    };

    useEffect(() => {
        const partnerId = conversation.members.find(
            (member) => member !== currentUserId
        );
        if (partnerId) {
            handleFetchPartnerData(partnerId);
        }
    }, [currentUserId, conversation]);

    if (loading) {
        return (
            <div className="flex flex-col gap-4 h-44 md:p-4 lg:w-full lg:justify-around shadow-lg bg-card dark:bg-cardDark">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="flex items-center w-full gap-4 p-2 text-regularText dark:text-regularTextDark bg-card dark:bg-cardDark hover:bg-cBlue dark:hover:bg-cBlue rounded-3xl">
            <ChatConversationListItem listItemData={chatPartner} />
            <div className="flex gap-2">
                {hasUnreadMessage && (
                    <div className="-translate-x-12 translate-y-3 md:-translate-x-0 md:translate-y-0 flex justify-center items-center mr-4">
                        <div className="w-3 h-3 bg-highlight dark:bg-highlightDark rounded-full animate-pulse" />
                    </div>
                )}
            </div>
        </div>
    );
}
