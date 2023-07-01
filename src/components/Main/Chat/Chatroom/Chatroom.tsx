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

export default function Chatroom() {
    const { authUser, token } = useAuth();
    const { currentUserData } = useCurrentUserData();
    const { setInfo } = useInfoCard();
    const partnerId = useParams().id;
    const [partnerData, setPartnerData] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [inputMessage, setInputMessage] = useState<any>('');
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

    const sendMessage = () => {
        if (inputMessage.trim() !== '') {
            setMessages([...messages, inputMessage]);
            setInputMessage('');
        }
    };

    useEffect(() => {
        handleFetchPartnerData();
    }, [partnerId]);

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
