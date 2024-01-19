import { useEffect, useRef, useState } from 'react';
import useCurrentUserData from '../../../hooks/useCurrentUserData';
import useAuth from '../../../hooks/useAuth';
import useInfoCard from '../../../hooks/useInfoCard';
import LoadingSpinner from '../../UiElements/LoadingSpinner/LoadingSpinner';
import { ChatConversationType } from '../../../types/chatTypes';
import Chatroom from './Chatroom/Chatroom';
import { Socket } from 'socket.io-client';
import ChatConversationList from './ChatConversationList/ChatConversationList';
import useNotificationBubblesContext from '../../../hooks/useNotificationBubblesContext';
import { motion } from 'framer-motion';
import { backendFetch } from '../../../utilities/backendFetch';
import { FetchStatusType } from '../../../types/miscTypes';

type ChatProps = {
    socket: Socket | undefined;
};

const USER_NOTIFICATION_TIMEOUT = 3000;
const USER_ERROR_NOTIFICATION_TIMEOUT = 15000;

/**
 * Chat component for managing chat conversations.
 *
 * @component
 * @param {ChatProps} props - The props object.
 * @param {Socket | undefined} props.socket - The socket for communication.
 * @returns {JSX.Element} The rendered Chat component.
 */
export default function Chat({ socket }: ChatProps): JSX.Element {
    const { token } = useAuth();
    const { currentUserData } = useCurrentUserData();
    const { setInfo } = useInfoCard();
    const {
        conversationsWithUnreadMessages,
        setConversationsWithUnreadMessages,
        activeChat,
        setActiveChat,
    } = useNotificationBubblesContext();

    const [conversations, setConversations] = useState<ChatConversationType[]>(
        []
    );
    const [fetchStatus, setFetchStatus] = useState<FetchStatusType>('idle');
    const [loading, setLoading] = useState<boolean>(true);

    const shouldInitialize = useRef(true);

    const currentUserId = currentUserData?._id;
    const activeChatId = activeChat?._id;
    const chatPartnerId = activeChat?.members.find(
        (member) => member !== currentUserId
    );

    /**
     * Fetches the list of conversations from the backend.
     *
     * @async
     * @function
     * @return {Promise<void>} A promise that resolves once the conversations are fetched.
     */
    const getConversations = async (): Promise<void> => {
        const currentConversations = conversations;
        if (currentUserId && token) {
            const apiEndpointURL = '/api/v1/chat/';
            const method = 'GET';
            const errorMessage = 'Unable to fetch conversations!';

            setFetchStatus('fetching');

            const delayedNotificationTimeout = setTimeout(() => {
                setFetchStatus('delayed');
            }, USER_NOTIFICATION_TIMEOUT);

            const errorNotificationTimeout = setTimeout(() => {
                setFetchStatus('error');
            }, USER_ERROR_NOTIFICATION_TIMEOUT);

            try {
                const response = await backendFetch(
                    token,
                    setInfo,
                    apiEndpointURL,
                    method,
                    errorMessage
                );
                setConversations(response?.conversation);
            } catch (error) {
                setConversations(currentConversations);
            } finally {
                clearTimeout(delayedNotificationTimeout);
                clearTimeout(errorNotificationTimeout);
                setFetchStatus('idle');
                setLoading(false);
            }
        }
    };

    /**
     * Handles the click event on a chat conversation.
     *
     * @param {ChatConversationType} conversation - The selected conversation.
     * @return {void} No return value.
     */
    const handleChatConversationClick = (
        conversation: ChatConversationType
    ): void => {
        setActiveChat(conversation);

        const hasUnreadMessage = conversationsWithUnreadMessages.includes(
            conversation._id
        );

        if (hasUnreadMessage) {
            setConversationsWithUnreadMessages((prevUnreadMessages) =>
                prevUnreadMessages.filter((id) => id !== conversation._id)
            );
        }
    };

    /**
     * Effect to handle the initial fetching of conversations and setting the active chat.
     *
     * @effect
     * @return {void} No return value.
     */
    useEffect(() => {
        if (activeChat) {
            setActiveChat(activeChat);
            getConversations();
        }
    }, [activeChat]);

    /**
     * Effect to initialize the component and fetch conversations on mount.
     *
     * @effect
     * @return {void} No return value.
     */
    useEffect(() => {
        if (shouldInitialize.current) {
            getConversations();

            return () => {
                shouldInitialize.current = false;
            };
        }
    }, [currentUserId]);

    /**
     * Effect to set activeChat to null when the component unmounts.
     *
     * @effect
     * @return {void} No return value.
     */
    useEffect(() => {
        return () => {
            setActiveChat(null);
        };
    }, []);

    /**
     * Content for the loading state.
     *
     * @type {JSX.Element}
     */
    const LoadingContent: JSX.Element = (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col justify-center items-center w-full h-[calc(100vh_-_2rem)] py-4  bg-background2 dark:bg-background2Dark text-regularText dark:text-regularTextDark"
        >
            <LoadingSpinner
                message={
                    fetchStatus === 'delayed'
                        ? 'Your request is taking longer than normal'
                        : fetchStatus === 'error'
                        ? 'It should not take this long...Try refreshing the page!'
                        : 'Loading chat'
                }
            />
        </motion.div>
    );

    /**
     * Content for the Chat component when not in loading state.
     *
     * @type {JSX.Element}
     */
    const ChatContent: JSX.Element = (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className=" flex flex-col min-h-[calc(100vh_-_3rem)] lg:min-h-full md:p-4 pb-4 bg-background2 dark:bg-background2Dark shadow-lg rounded lg:rounded-lg"
        >
            <div
                className={`${
                    loading ? 'hidden' : 'md:grid'
                } grid-cols-[2fr,5fr] md:min-h-[calc(100vh_-_5rem)] gap-4 bg-background2 dark:bg-background2Dark rounded lg:rounded-lg`}
            >
                <ChatConversationList
                    conversations={conversations}
                    conversationsWithUnreadMessages={
                        conversationsWithUnreadMessages
                    }
                    handleChatConversationClick={handleChatConversationClick}
                    currentUserId={currentUserId}
                />

                <div className="flex flex-col gap-8">
                    {activeChat ? (
                        <motion.div
                            key={activeChat?._id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="h-full"
                        >
                            <Chatroom
                                chatId={activeChatId}
                                partnerId={chatPartnerId}
                                socket={socket}
                            />
                        </motion.div>
                    ) : (
                        <div className="flex justify-center items-center text-3xl font-bold text-gray-400 text-center h-[calc(100vh_-_12rem)]  lg:h-[calc(100vh_-_5rem)]">
                            No conversation selected
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );

    /**
     * Renders the Chat component depending on the loading state of the component.
     *
     * @return {JSX.Element} The rendered Chat component.
     */
    return loading ? LoadingContent : ChatContent;
}
