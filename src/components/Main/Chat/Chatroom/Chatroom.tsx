import React, { useEffect, useRef, useState } from 'react';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner';
import useAuth from '../../../../hooks/useAuth';
import { fetchMinimalUserData } from '../../../../utilities/fetchMinimalUserData';
import useInfoCard from '../../../../hooks/useInfoCard';
import ChatroomHeader from './ChatroomHeader/ChatroomHeader';
import ChatroomMessage from './ChatroomMessage/ChatroomMessage';
import ChatroomInput from './ChatroomInput/ChatroomInput';
import { io } from 'socket.io-client';
import { ChatMessageType } from '../../../../types/chatMessageType';

export default function Chatroom() {
    const { authUser, token } = useAuth();
    const { currentUserData } = useCurrentUserData();
    const { setInfo } = useInfoCard();
    const partnerId = useParams().id;
    const [partnerData, setPartnerData] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [inputMessage, setInputMessage] = useState<any>('');
    const [loading, setLoading] = useState<boolean>(true);

    const socket = useRef<any>();
    const dummy = useRef<HTMLSpanElement>(null);
    const userId = currentUserData?._id;

    const handleFetchPartnerData = async () => {
        if (authUser && token) {
            const response = await fetchMinimalUserData(
                token,
                partnerId,
                setInfo
            );
            setPartnerData(response);
            setLoading(false);
        }
    };

    const sendMessage = () => {
        if (userId && partnerId && inputMessage.trim() !== '') {
            const timestamp = Date.now();
            emitMessage({
                senderId: userId,
                receiverId: partnerId,
                text: inputMessage,
                timestamp: timestamp,
            });
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    senderId: userId,
                    receiverId: partnerId,
                    text: inputMessage,
                    timestamp: timestamp,
                },
            ]);
            setInputMessage('');
        }
    };

    const emitMessage = (messageObject: ChatMessageType) => {
        socket.current.emit('sendMessage', messageObject);
    };

    const listenForMessage = () => {
        socket.current.on('receiveMessage', (data: ChatMessageType) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });
    };

    const scrollToBottom = () => {
        dummy?.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const serverURL = import.meta.env.VITE_SERVER_URL;
        socket.current = io(serverURL);
        return () => {
            socket.current.disconnect();
        };
    }, []);

    useEffect(() => {
        handleFetchPartnerData();
    }, [partnerId]);

    useEffect(() => {
        if (currentUserData) {
            const userId = currentUserData?._id;
            socket.current.emit('addUser', userId);
        }
    }, [currentUserData]);

    useEffect(() => {
        listenForMessage();

        return () => {
            socket.current.off('receiveMessage');
        };
    }, [socket]);

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
