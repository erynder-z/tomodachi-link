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
    const [inputMessage, setInputMessage] = useState<string>('');
    const [receivedMessage, setReceivedMessage] =
        useState<DisplayChatMessageType | null>(null);
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const shouldFetch = useRef(true);
    const shouldInitializeSocket = useRef(true);

    const dummy = useRef<HTMLSpanElement>(null);
    const userId = currentUserData?._id;

    const handleFetchPartnerData = async () => {
        if (token && partnerId) {
            const apiEndpointURL = `/api/v1/users/${partnerId}`;
            const method = 'GET';
            const errorMessage = 'Unable to fetch user data!';

            const response = await backendFetch(
                token,
                setInfo,
                apiEndpointURL,
                method,

                errorMessage
            );
            setPartnerData(response?.user);
            setLoading(false);
        }
    };

    const handleFetchChatMessages = async () => {
        if (token && chatId) {
            const apiEndpointURL = `/api/v1/message/${chatId}`;
            const method = 'GET';
            const errorMessage = 'Unable to fetch conversation!';

            const response = await backendFetch(
                token,
                setInfo,
                apiEndpointURL,
                method,

                errorMessage
            );
            setMessages(response?.messages);
            setLoading(false);
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
        setIsTyping(true);
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
        }, 1500);
    };

    const handlePostMessage = async (message: DatabaseChatMessageType) => {
        if (token && inputMessage) {
            const response = await postMessage(token, message, setInfo);
            if (response && response.ok) {
                const savedMessage = await response.json();
                setMessages([...messages, savedMessage.savedMessage]);
            } else {
                setInfo({
                    typeOfInfo: 'bad',
                    message: 'Message not saved!',
                    icon: '👻',
                });
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
                setInfo({
                    typeOfInfo: 'bad',
                    message: 'Something went wrong when sending your message!',
                    icon: '👻',
                });
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
            handleFetchChatMessages();
        }
        return () => {
            shouldFetch.current = false;
        };
    }, []);

    useEffect(() => {
        if (receivedMessage && partnerId === receivedMessage.senderId) {
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        }
        if (token && chatId) {
            const typeOfOperation = 'read';
            handleChatMessagesInDB(token, chatId, setInfo, typeOfOperation);
        }
    }, [receivedMessage]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const LoadingContent = (
        <div className="flex flex-col gap-4 h-full md:p-4 lg:w-full lg:justify-around shadow-lg">
            <LoadingSpinner message="Getting conversation" />
        </div>
    );

    const ChatroomContent = (
        <div className="flex flex-col min-h-[calc(100vh-_5rem)] lg:min-h-full bg-background2 dark:bg-background2Dark shadow-lg max-h-full rounded md:rounded-lg">
            <ChatroomHeader
                currentUserData={currentUserData}
                partnerData={partnerData}
            />
            <div className="flex-1 overflow-y-auto pb-12 mt-4">
                {messages.map((message, index) => (
                    <ChatroomMessage key={index} message={message} />
                ))}
                {messages.length === 0 && (
                    <div className="flex flex-col justify-center items-center px-4 text-xl font-bold text-gray-400 text-center h-[calc(100vh_-_19rem)]  lg:h-[calc(100vh_-_22rem)]">
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
