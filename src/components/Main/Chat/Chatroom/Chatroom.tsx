import React, { useEffect, useRef, useState } from 'react';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';
import LoadingSpinner from '../../../UiElements/LoadingSpinner/LoadingSpinner';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import ChatroomHeader from './ChatroomHeader/ChatroomHeader';
import ChatroomMessage from './ChatroomMessage/ChatroomMessage';
import ChatroomInput from './ChatroomInput/ChatroomInput';
import { Socket } from 'socket.io-client';
import { DatabaseChatMessageType } from '../../../../types/databaseChatMessageType';
import { fetchMinimalUserData } from '../../../../utilities/fetchMinimalUserData';
import { MinimalUserTypes } from '../../../../types/minimalUserTypes';
import { fetchChatMessages } from '../../../../utilities/fetchChatMessages';
import { postMessage } from '../../../../utilities/postMessage';
import { SocketChatMessageType } from '../../../../types/socketChatMessageType';
import { DisplayChatMessageType } from '../../../../types/displayChatMessageType';
import { SocketTypingIndicatorType } from '../../../../types/socketTypingIndicatorType';
import TypingIndicator from './TypingIndicator/TypingIndicator';
import { markMessageUnreadInDB } from '../../../../utilities/markMessageUnreadInDB';
import { markMessageReadInDB } from '../../../../utilities/markMessageReadInDB';
import EmojiSelector from '../../Post/NewPostInput/EmojiSelector/EmojiPicker';

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

    const dummy = useRef<HTMLSpanElement>(null);
    const userId = currentUserData?._id;

    const handleFetchPartnerData = async () => {
        if (token && partnerId) {
            const response = await fetchMinimalUserData(
                token,
                partnerId,
                setInfo
            );
            setPartnerData(response);
            setLoading(false);
        }
    };

    const handleFetchChatMessages = async () => {
        if (token && chatId) {
            const response = await fetchChatMessages(token, chatId, setInfo);
            setMessages(response);
            setLoading(false);
        }
    };

    const handleMarkMessageUnreadInDB = async () => {
        if (token && chatId) {
            await markMessageUnreadInDB(token, chatId, setInfo);
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
        dummy?.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        listenForMessage();
        const cleanupMessage = () => {
            socket?.off('receiveMessage');
        };
        return cleanupMessage;
    }, [socket]);

    useEffect(() => {
        listenForTyping();
        const cleanupTyping = () => {
            socket?.off('typing', handleTyping);
        };
        return cleanupTyping;
    }, [socket]);

    useEffect(() => {
        handleFetchPartnerData();
        handleFetchChatMessages();
    }, [partnerId]);

    useEffect(() => {
        if (receivedMessage && partnerId === receivedMessage.senderId) {
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        }
        if (token && chatId) {
            markMessageReadInDB(token, chatId, setInfo);
        }
    }, [receivedMessage]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    if (loading) {
        return (
            <div className="flex flex-col gap-4 h-44 md:p-4 lg:w-full lg:justify-around shadow-lg bg-card dark:bg-cardDark">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-[calc(100vh-_5rem)] lg:min-h-full bg-background2 dark:bg-background2Dark shadow-lg max-h-full rounded md:rounded-lg">
            <ChatroomHeader
                currentUserData={currentUserData}
                partnerData={partnerData}
            />
            <div className="flex-1 overflow-y-auto pb-12">
                {messages.map((message, index) => (
                    <ChatroomMessage key={index} message={message} />
                ))}
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
}
