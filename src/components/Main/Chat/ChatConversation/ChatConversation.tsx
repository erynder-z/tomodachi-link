import React, { useEffect, useState } from 'react';
import { ChatConversationType } from '../../../../types/chatConversationType';
import { fetchMinimalUserData } from '../../../../utilities/fetchMinimalUserData';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import LoadingSpinner from '../../../UiElements/LoadingSpinner/LoadingSpinner';
import ChatUserListItem from '../ChatConversationListItem/ChatConversationListItem';
import { MinimalUserTypes } from '../../../../types/minimalUserTypes';

type ChatConversationProps = {
    conversation: ChatConversationType;
    currentUserId: string | undefined;
};

export default function ChatConversation({
    conversation,
    currentUserId,
}: ChatConversationProps) {
    const { token } = useAuth();
    const { setInfo } = useInfoCard();
    const [chatPartner, setChatPartner] = useState<MinimalUserTypes | null>(
        null
    );
    const [loading, setLoading] = useState<boolean>(false);

    const handleFetchPartnerData = async (partnerId: string) => {
        if (token) {
            const response = await fetchMinimalUserData(
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
            <div className="flex flex-col gap-4 h-44 md:p-4 lg:w-full lg:justify-around shadow-lg bg-canvas">
                <LoadingSpinner />
            </div>
        );
    }

    return <ChatUserListItem listItemData={chatPartner} />;
}
