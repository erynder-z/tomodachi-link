import { useEffect, useRef, useState } from 'react';
import { ChatConversationType } from '../../../../types/chatTypes';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import LoadingSpinner from '../../../UiElements/LoadingSpinner/LoadingSpinner';
import { MinimalUserTypes } from '../../../../types/otherUserTypes';
import ChatConversationListItem from '../ChatConversationListItem/ChatConversationListItem';
import { handleConversationMuteBackend } from '../../../../utilities/handleConversationMuteBackend';
import useNotificationBubblesContext from '../../../../hooks/useNotificationBubblesContext';
import { backendFetch } from '../../../../utilities/backendFetch';

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
        <div className="w-20 md:w-full p-2 text-regularText dark:text-regularTextDark bg-background1 dark:bg-background1Dark md:bg-card md:dark:bg-cardDark hover:bg-highlight dark:hover:bg-highlightDark duration-300 rounded-full">
            <ChatConversationListItem
                listItemData={chatPartner}
                isConversationMuted={isConversationMuted}
                hasUnreadMessage={hasUnreadMessage}
                handleMuteConversation={handleMuteConversation}
            />
        </div>
    );

    return loading ? LoadingContent : ChatConversationContent;
}
