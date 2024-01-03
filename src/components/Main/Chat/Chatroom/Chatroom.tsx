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

export default function Chatroom({ chatId, partnerId, socket }: ChatroomProps) {
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

    const handleFetchPartnerData = async () => {
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

    const handleFetchChatMessages = async (
        messageScope: 'all' | 'latest' = 'latest'
    ) => {
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

    const handleMarkMessageUnreadInDB = async () => {
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

    const handleTyping = () => {
        const TIMEOUT = 1500;
        setIsTyping(true);
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
        }, TIMEOUT);
    };

    const handlePostMessage = async (message: DatabaseChatMessageType) => {
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

    const sendMessage = async () => {
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

    const emitMessage = (messageObject: SocketChatMessageType) => {
        socket?.emit('sendMessage', messageObject);
    };

    const sendTypingIndicator = () => {
        socket?.emit('typing', {
            senderId: userId,
            receiverId: partnerId,
        });
    };

    const listenForMessage = () => {
        socket?.on('receiveMessage', (data: SocketChatMessageType) => {
            setReceivedMessage({
                senderId: data.senderId,
                text: data.text,
                createdAt: new Date(),
            });
        });
    };

    const listenForTyping = () => {
        socket?.on('typing', (data: SocketTypingIndicatorType) => {
            if (data.senderId === partnerId && data.receiverId === userId) {
                handleTyping();
            }
        });
    };

    const scrollToBottom = () => {
        dummy?.current?.scrollIntoView({
            behavior: 'smooth',
        });
    };

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

    useEffect(() => {
        if (receivedMessage && partnerId === receivedMessage.senderId) {
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);

            if (token && chatId) {
                const typeOfOperation = 'read';
                handleChatMessagesInDB(token, chatId, setInfo, typeOfOperation);
            }
        }
    }, [receivedMessage]);

    useEffect(() => {
        if (shouldScroll.current) scrollToBottom();
        // re-enable scrolling to bottom after all messages have been fetched
        if (messages.length <= totalMessages) shouldScroll.current = true;
    }, [messages]);

    const LoadingContent = (
        <div className="flex flex-col gap-4 h-full md:p-4 md:w-full lg:justify-around shadow-lg">
            <LoadingSpinner message="Getting conversation" />
        </div>
    );

    const ChatroomContent = (
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
                {messages.map((message, index) => (
                    <ChatroomMessage key={index} message={message} />
                ))}
                {messages.length === 0 && (
                    <div className="flex flex-col justify-center items-center px-4 text-xl font-bold text-gray-400 text-center h-[calc(100vh_-_24rem)]">
                        <span>Chat message will appear here.</span>
                    </div>
                )}
                <TypingIndicator isTyping={isTyping} />
                <span ref={dummy} />
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

    return loading ? LoadingContent : ChatroomContent;
}
