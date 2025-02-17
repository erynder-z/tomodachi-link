import { useEffect, useRef, useState } from 'react';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';
import LoadingSpinner from '../../../UiElements/LoadingSpinner/LoadingSpinner';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import ChatroomHeader from './ChatroomHeader/ChatroomHeader';
import ChatroomMessage from './ChatroomMessage/ChatroomMessage';
import ChatroomInput from './ChatroomInput/ChatroomInput';
import { Socket } from 'socket.io-client';
import {
    DatabaseChatMessageType,
    SocketChatMessageType,
    DisplayChatMessageType,
    SocketTypingIndicatorType,
} from '../../../../types/chatTypes';
import { MinimalUserTypes } from '../../../../types/otherUserTypes';
import { postMessage } from '../../../../utilities/postMessage';
import TypingIndicator from './TypingIndicator/TypingIndicator';
import EmojiSelector from '../../Post/NewPostInput/EmojiSelector/EmojiPicker';
import { backendFetch } from '../../../../utilities/backendFetch';
import { handleChatMessagesInDB } from '../../../../utilities/handleChatMessagesInDatabase';
import GetOlderMessagesButton from './GetOlderMessagesButton/GetOlderMessagesButton';
import { displayErrorInfo } from '../../../UiElements/UserNotification/displayErrorInfo';

type ChatroomProps = {
    chatId: string | undefined;
    partnerId: string | undefined;
    socket: Socket | undefined;
};

/**
 * Chatroom component for displaying chat messages, input, and real-time communication.
 *
 * @component
 * @param {ChatroomProps} props - The props object.
 * @param {string | undefined} props.chatId - The ID of the chat.
 * @param {string | undefined} props.partnerId - The ID of the chat partner.
 * @param {Socket | undefined} props.socket - The socket for real-time communication.
 * @returns {JSX.Element} The rendered Chatroom component.
 */
export default function Chatroom({
    chatId,
    partnerId,
    socket,
}: ChatroomProps): JSX.Element {
    const { token } = useAuth();
    const { currentUserData } = useCurrentUserData();
    const { setInfo } = useInfoCard();

    const [partnerData, setPartnerData] = useState<MinimalUserTypes | null>(
        null
    );
    const [messages, setMessages] = useState<DisplayChatMessageType[]>([]);
    const [totalMessages, setTotalMessages] = useState<number>(0);
    const [inputMessage, setInputMessage] = useState<string>('');
    const [receivedMessage, setReceivedMessage] =
        useState<DisplayChatMessageType | null>(null);
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const shouldScroll = useRef(true);
    const shouldFetch = useRef(true);
    const shouldInitializeSocket = useRef(true);
    const canLoadMoreMessages = messages.length < totalMessages;

    const dummy = useRef<HTMLSpanElement>(null);
    const userId = currentUserData?._id;

    /**
     * Handle fetching partner data from the backend API
     *
     * @async
     * @function
     * @return {Promise<void>} A promise that resolves once the partner data is fetched.
     */
    const handleFetchPartnerData = async (): Promise<void> => {
        if (token && partnerId) {
            const API_ENDPOINT_URL = `/api/v1/users/${partnerId}`;
            const METHOD = 'GET';
            const ERROR_MESSAGE = 'Unable to fetch user data!';

            const response = await backendFetch(
                token,
                setInfo,
                API_ENDPOINT_URL,
                METHOD,
                ERROR_MESSAGE
            );
            setPartnerData(response?.user);
            setLoading(false);
        }
    };

    /**
     * Fetches chat messages from the API.
     *
     * @async
     * @function
     * @param {string} messageScope - The scope of the messages to fetch. Defaults to 'latest'.
     * @return {Promise<void>} - The promise that resolves once the messages are fetched.
     */
    const handleFetchChatMessages = async (
        messageScope: 'all' | 'latest' = 'latest'
    ): Promise<void> => {
        if (token && chatId) {
            setIsSubmitting(true);
            const API_ENDPOINT_URL = `/api/v1/message/${chatId}?messageScope=${messageScope}`;
            const METHOD = 'GET';
            const ERROR_MESSAGE = 'Unable to fetch conversation!';

            const response = await backendFetch(
                token,
                setInfo,
                API_ENDPOINT_URL,
                METHOD,
                ERROR_MESSAGE
            );
            setMessages(response?.messages);
            setTotalMessages(response?.totalMessageCount);
            setIsSubmitting(false);
            setLoading(false);
            // prevent scrolling to bottom when loading all messages instead of only the latest
            messageScope === 'all'
                ? (shouldScroll.current = false)
                : (shouldScroll.current = true);
        }
    };

    /**
     * Handles marking a message as unread in the database.
     *
     * @async
     * @function
     * @return {Promise<void>}- The promise that resolves once the messages has been marked as unread.
     */
    const handleMarkMessageUnreadInDB = async (): Promise<void> => {
        if (token && chatId) {
            const typeOfOperation = 'unread';
            await handleChatMessagesInDB(
                token,
                chatId,
                setInfo,
                typeOfOperation
            );
        }
    };

    /**
     * Handles the typing event.
     *
     * @function
     * @return {void} No return value.
     */
    const handleTyping = (): void => {
        const TIMEOUT = 1500;
        setIsTyping(true);
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
        }, TIMEOUT);
    };

    /**
     * Handle posting a message to the database chat.
     *
     * @async
     * @function
     * @param {DatabaseChatMessageType} message - the message to be posted
     * @return {Promise<void>}
     */
    const handlePostMessage = async (
        message: DatabaseChatMessageType
    ): Promise<void> => {
        if (token && inputMessage) {
            const response = await postMessage(token, message, setInfo);
            if (response && response.ok) {
                const savedMessage = await response.json();
                setMessages([...messages, savedMessage.savedMessage]);
            } else {
                displayErrorInfo(setInfo, 'Message not saved!', '👻');
            }
        }
    };

    /**
     * Sends a message if the user ID, partner ID, and input message are valid.
     *
     * @async
     * @function
     * @return {Promise<void>} - Resolves when the message is sent successfully.
     */
    const sendMessage = async (): Promise<void> => {
        if (userId && partnerId && inputMessage.trim() !== '') {
            setIsSubmitting(true);

            try {
                await handlePostMessage({
                    senderId: userId,
                    text: inputMessage,
                    conversationId: chatId,
                });

                emitMessage({
                    senderId: userId,
                    receiverId: partnerId,
                    conversationId: chatId,
                    text: inputMessage,
                });

                handleMarkMessageUnreadInDB();
                setInputMessage('');
            } catch (error) {
                displayErrorInfo(
                    setInfo,
                    'Something went wrong when sending your message!',
                    '👻'
                );
            }

            setIsSubmitting(false);
        }
    };

    /**
     * Emits a message using the provided message object.
     *
     * @function
     * @param {SocketChatMessageType} messageObject - the message object to emit
     * @return {void}
     */
    const emitMessage = (messageObject: SocketChatMessageType): void => {
        socket?.emit('sendMessage', messageObject);
    };

    /**
     * Sends a typing indicator to the socket.
     *
     * @function
     * @return {void}
     */
    const sendTypingIndicator = (): void => {
        socket?.emit('typing', {
            senderId: userId,
            receiverId: partnerId,
        });
    };

    /**
     * Listens for a message event from the socket and updates the received message state.
     * @function
     * @return {void}
     */
    const listenForMessage = (): void => {
        socket?.on('receiveMessage', (data: SocketChatMessageType) => {
            setReceivedMessage({
                senderId: data.senderId,
                text: data.text,
                createdAt: new Date(),
            });
        });
    };

    /**
     * Listens for typing events on the socket and handles them if they are from the partner.
     * @function
     * @return {void}
     */
    const listenForTyping = (): void => {
        socket?.on('typing', (data: SocketTypingIndicatorType) => {
            if (data.senderId === partnerId && data.receiverId === userId) {
                handleTyping();
            }
        });
    };

    /**
     * Scroll to an referenced element.
     *
     * @function
     * @return {void} No return value.
     */
    const scrollToElement = (): void => {
        dummy?.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest',
        });
    };

    /**
     * Effect to initialize the socket listeners for receiving messages and typing indicators.
     * Cleans up the listeners on component unmount.
     *
     * @effect
     * @return {void} No return value.
     */
    useEffect(() => {
        if (shouldInitializeSocket.current) {
            listenForMessage();
            listenForTyping();
            const cleanupMessage = () =>
                socket?.off('receiveMessage', setReceivedMessage);
            const cleanupTyping = () => socket?.off('typing', handleTyping);

            return () => {
                cleanupMessage();
                cleanupTyping();
                shouldInitializeSocket.current = false;
            };
        }
    }, [socket]);

    /**
     * Effect to fetch partner data and the latest chat messages on component mount.
     * Also handles marking messages as read in the database.
     *
     * @effect
     * @return {void} No return value.
     */
    useEffect(() => {
        if (shouldFetch.current) {
            handleFetchPartnerData();
            handleFetchChatMessages('latest');
            if (token && chatId) {
                const typeOfOperation = 'read';
                handleChatMessagesInDB(token, chatId, setInfo, typeOfOperation);
            }
        }
        return () => {
            shouldFetch.current = false;
        };
    }, []);

    /**
     * Effect to update messages when a new message is received.
     * Also handles marking received messages as read in the database.
     *
     * @effect
     * @return {void} No return value.
     */
    useEffect(() => {
        if (receivedMessage && partnerId === receivedMessage.senderId) {
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);

            if (token && chatId) {
                const typeOfOperation = 'read';
                handleChatMessagesInDB(token, chatId, setInfo, typeOfOperation);
            }
        }
    }, [receivedMessage]);

    /**
     * Effect to scroll to a referenced when new messages are added.
     * Re-enables scrolling to the bottom after all messages have been fetched.
     *
     * @effect
     * @return {void} No return value.
     */
    useEffect(() => {
        if (shouldScroll.current) scrollToElement();
        // re-enable scrolling to bottom after all messages have been fetched
        if (messages.length <= totalMessages) shouldScroll.current = true;
    }, [messages]);

    /**
     * Content to display while loading.
     *
     * @type {JSX.Element}
     */
    const LoadingContent: JSX.Element = (
        <div className="flex flex-col gap-4 h-full md:p-4 md:w-full lg:justify-around shadow-lg">
            <LoadingSpinner message="Getting conversation" />
        </div>
    );

    /**
     * Content for the rendered Chatroom.
     *
     * @type {JSX.Element}
     */
    const ChatroomContent: JSX.Element = (
        <div className="flex flex-col min-h-[calc(100vh-_5rem)] lg:min-h-full bg-background2 dark:bg-background2Dark shadow-lg max-h-full rounded md:rounded-lg">
            <ChatroomHeader
                currentUserData={currentUserData}
                partnerData={partnerData}
            />
            <div className="flex-1 overflow-y-hidden pb-8 pt-20 lg:pb-8 lg:pt-12">
                {canLoadMoreMessages && (
                    <GetOlderMessagesButton
                        handleFetchChatMessages={handleFetchChatMessages}
                        isSubmitting={isSubmitting}
                    />
                )}
                {messages.map((message, index) => {
                    const isLastMessage = index === messages.length - 1;
                    return (
                        <>
                            {isLastMessage && <span ref={dummy} />}
                            <ChatroomMessage key={index} message={message} />
                        </>
                    );
                })}
                {messages.length === 0 && (
                    <div className="flex flex-col justify-center items-center px-4 text-xl font-bold text-gray-400 text-center h-[calc(100vh_-_24rem)]">
                        <span>Chat message will appear here.</span>
                    </div>
                )}
                <TypingIndicator isTyping={isTyping} />
            </div>
            <ChatroomInput
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                sendMessage={sendMessage}
                onTyping={sendTypingIndicator}
                isSubmitting={isSubmitting}
                setShowEmojiPicker={setShowEmojiPicker}
            />
            {showEmojiPicker && (
                <EmojiSelector
                    setText={setInputMessage}
                    setShowEmojiPicker={() => setShowEmojiPicker(false)}
                />
            )}
        </div>
    );

    /**
     * Renders the ChatOnlineUsersList based on the loading state.
     *
     * @return {JSX.Element} The rendered ChatOnlineUsersList component.
     */
    return loading ? LoadingContent : ChatroomContent;
}
