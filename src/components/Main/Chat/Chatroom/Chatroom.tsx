import React, { useEffect, useRef, useState } from 'react';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner';
import useAuth from '../../../../hooks/useAuth';
import { FaExclamationTriangle } from 'react-icons/fa';
import useInfoCard from '../../../../hooks/useInfoCard';
import ChatroomHeader from './ChatroomHeader/ChatroomHeader';
import ChatroomMessage from './ChatroomMessage/ChatroomMessage';
import ChatroomInput from './ChatroomInput/ChatroomInput';
import { Socket } from 'socket.io-client';
import { ChatMessageType } from '../../../../types/chatMessageType';
import { fetchMinimalUserData } from '../../../../utilities/fetchMinimalUserData';
import { MinimalUserTypes } from '../../../../types/minimalUserTypes';
import { fetchChatMessages } from '../../../../utilities/fetchChatMessages';
import { postMessage } from '../../../../utilities/postMessage';
import { SocketChatMessageType } from '../../../../types/socketChatMessageType';

type ChatroomProps = {
    chatId: string | undefined;
    partnerId: string | undefined;
    socket: Socket;
};

export default function Chatroom({ chatId, partnerId, socket }: ChatroomProps) {
    const { token } = useAuth();
    const { currentUserData } = useCurrentUserData();
    const { setInfo } = useInfoCard();

    const [partnerData, setPartnerData] = useState<MinimalUserTypes | null>(
        null
    );
    const [messages, setMessages] = useState<any[]>([]);
    const [inputMessage, setInputMessage] = useState<string>('');
    const [receivedMessage, setReceivedMessage] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

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

    const handlePostMessage = async (message: ChatMessageType) => {
        if (token && inputMessage) {
            const response = await postMessage(token, message, setInfo);
            if (response && response.ok) {
                const savedMessage = await response.json();
                setMessages([...messages, savedMessage.savedMessage]);
            } else {
                setInfo({
                    typeOfInfo: 'bad',
                    message: 'Message not saved!',
                    icon: <FaExclamationTriangle />,
                });
            }
        }
    };

    const sendMessage = () => {
        if (userId && partnerId && inputMessage.trim() !== '') {
            handlePostMessage({
                senderId: userId,
                text: inputMessage,
                conversationId: chatId,
            });
            emitMessage({
                senderId: userId,
                receiverId: partnerId,
                text: inputMessage,
            });

            setMessages((prevMessages) => [
                ...prevMessages,
                { senderId: userId, receiverId: partnerId, text: inputMessage },
            ]);
            setInputMessage('');
        }
    };

    const emitMessage = (messageObject: SocketChatMessageType) => {
        socket?.emit('sendMessage', messageObject);
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

    const scrollToBottom = () => {
        dummy?.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (currentUserData) {
            const userId = currentUserData?._id;
            socket?.emit('addUser', userId);
        }
    }, [currentUserData]);

    useEffect(() => {
        listenForMessage();

        return () => {
            socket?.off('receiveMessage');
        };
    }, [socket]);

    useEffect(() => {
        handleFetchPartnerData();
        handleFetchChatMessages();
    }, [partnerId]);

    useEffect(() => {
        if (receivedMessage && partnerId === receivedMessage.senderId) {
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        }
    }, [receivedMessage]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    if (loading) {
        return (
            <div className="flex flex-col gap-4 h-44 md:p-4 lg:w-full lg:justify-around shadow-lg bg-canvas">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-[calc(100vh_-_5rem)] lg:min-h-full lg:p-4 md:p-0 pb-4 bg-background2 shadow-lg max-h-full overflow-y-auto ">
            <ChatroomHeader
                currentUserData={currentUserData}
                partnerData={partnerData}
            />
            <div className="flex-1 overflow-y-auto px-2">
                {messages.map((message, index) => (
                    <ChatroomMessage key={index} message={message} />
                ))}
                <span ref={dummy} />
            </div>
            <ChatroomInput
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                sendMessage={sendMessage}
            />
        </div>
    );
}
