import React, { useEffect, useState } from 'react';
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
import { fetchChatroomId } from '../../../../utilities/fechtChatroomId';

const serverURL = import.meta.env.VITE_SERVER_URL;
const socket = io(serverURL);

export default function Chatroom() {
    const { authUser, token } = useAuth();
    const { currentUserData } = useCurrentUserData();
    const { setInfo } = useInfoCard();
    const partnerId = useParams().id;
    const [partnerData, setPartnerData] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [inputMessage, setInputMessage] = useState<any>('');
    const [chatroomId, setChatroomId] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

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

    const handleFetchChatroomId = async () => {
        if (authUser && token) {
            const response = await fetchChatroomId(token, partnerId, setInfo);
            setChatroomId(response);
        }
    };

    const joinChatroom = () => {
        if (chatroomId) {
            socket.emit('joinRoom', chatroomId);
        }
    };

    const sendMessage = () => {
        if (inputMessage.trim() !== '') {
            const timestamp = Date.now();
            emitMessage({
                text: inputMessage,
                chatroomId,
                timestamp,
            });
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: inputMessage, timestamp },
            ]);
            setInputMessage('');
        }
    };

    const emitMessage = (message: ChatMessageType) => {
        socket.emit('sendMessage', message);
    };

    const listenForMessage = () => {
        socket.on('receiveMessage', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });
    };

    useEffect(() => {
        handleFetchPartnerData();
        handleFetchChatroomId();
    }, [partnerId]);

    useEffect(() => {
        joinChatroom();
        console.log(chatroomId);
    }, [chatroomId]);

    useEffect(() => {
        listenForMessage();

        return () => {
            socket.off('receiveMessage');
        };
    }, [socket]);

    if (loading) {
        return (
            <div className="flex flex-col gap-4 h-44 md:p-4 lg:w-full lg:justify-around shadow-lg bg-canvas">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-[calc(100vh_-_5rem)] lg:min-h-full lg:p-4 md:p-0 pb-4 bg-background2 shadow-lg">
            <ChatroomHeader
                currentUserData={currentUserData}
                partnerData={partnerData}
            />
            <div className="flex-1 overflow-y-auto">
                {messages.map((message, index) => (
                    <ChatroomMessage key={index} message={message} />
                ))}
            </div>
            <ChatroomInput
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                sendMessage={sendMessage}
            />
        </div>
    );
}
