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

/**
 * ChatConversation component for displaying a single chat conversation.
 *
 * @component
 * @param {ChatConversationProps} props - The props object.
 * @param {ChatConversationType} props.conversation - The chat conversation data.
 * @param {string | undefined} props.currentUserId - The ID of the current user.
 * @param {boolean} props.hasUnreadMessage - Indicates if the conversation has unread messages.
 * @param {boolean} props.isMuted - Indicates if the conversation is muted.
 * @returns {JSX.Element} The rendered ChatConversation component.
 */

export default function ChatConversation({
    conversation,
    currentUserId,
    hasUnreadMessage,
    isMuted,
}: ChatConversationProps): JSX.Element {
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

    /**
     * Handles the mute/unmute conversation action.
     *
     * @function
     * @return {void} No return value.
     */
    const handleMuteConversation = (): void => {
        setIsConversationMuted(!isConversationMuted);
        const updatedMutedConversations = isConversationMuted
            ? mutedConversations.filter((id) => id !== conversationId)
            : [...mutedConversations, conversationId];
        setMutedConversations(updatedMutedConversations);

        if (token && conversationId)
            handleConversationMuteBackend(token, conversationId, setInfo);
    };

    /**
     * Fetches data of the chat partner for the conversation.
     *
     * @async
     * @function
     * @return {void} No return value.
     */
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

    /**
     * Content for the loading state.
     *
     * @type {JSX.Element}
     */
    const LoadingContent: JSX.Element = (
        <div className="flex flex-col gap-2 md:gap-4 h-44 md:p-4 lg:w-full lg:justify-around shadow-lg bg-card dark:bg-cardDark">
            <LoadingSpinner />
        </div>
    );

    /**
     * Content for the ChatConversation when not in loading state.
     *
     * @type {JSX.Element}
     */
    const ChatConversationContent: JSX.Element = (
        <div className="w-20 md:w-full p-2 text-regularText dark:text-regularTextDark bg-background1 dark:bg-background1Dark md:bg-card md:dark:bg-cardDark hover:bg-highlight dark:hover:bg-highlightDark duration-300 rounded-full">
            <ChatConversationListItem
                listItemData={chatPartner}
                isConversationMuted={isConversationMuted}
                hasUnreadMessage={hasUnreadMessage}
                handleMuteConversation={handleMuteConversation}
            />
        </div>
    );

    /**
     * Renders the ChatConversation component depending on the loading state of the component.
     *
     * @return {JSX.Element} The rendered ChatConversation component.
     */
    return loading ? LoadingContent : ChatConversationContent;
}
