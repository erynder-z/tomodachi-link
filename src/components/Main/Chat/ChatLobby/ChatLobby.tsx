import React, { useEffect, useRef, useState } from 'react';
import { CurrentViewType } from '../../../../types/currentViewType';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';
import { fetchChatConversation } from '../../../../utilities/fetchChatConversation';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner';
import ChatConversation from '../ChatConversation/ChatConversation';
import { ChatConversationType } from '../../../../types/chatConversationType';
import Chatroom from '../Chatroom/Chatroom';
import { io } from 'socket.io-client';

type ChatLobbyProps = {
    setCurrentView: React.Dispatch<React.SetStateAction<CurrentViewType>>;
};

export default function ChatLobby({ setCurrentView }: ChatLobbyProps) {
    const { token } = useAuth();
    const { currentUserData } = useCurrentUserData();
    const { setInfo } = useInfoCard();

    const [conversations, setConversations] = useState<any[]>([]);
    const [activeChat, setActiveChat] = useState<ChatConversationType | null>(
        null
    );
    const [loading, setLoading] = useState<boolean>(true);

    const socket = useRef<any>();
    const currentUserId = currentUserData?._id;
    const activeChatId = activeChat?._id;
    const chatPartnerId = activeChat?.members.find(
        (member) => member !== currentUserId
    );

    const connectToSocket = () => {
        const serverURL = import.meta.env.VITE_SERVER_URL;
        socket.current = io(serverURL);
    };

    const getConversations = async () => {
        if (currentUserId && token) {
            const response = await fetchChatConversation(
                currentUserId,
                token,
                setInfo
            );
            setConversations(response);
            setLoading(false);
        }
    };

    const addCurrentUserToChat = () => {
        if (currentUserData) {
            const userId = currentUserData?._id;
            socket?.current?.emit('addUser', userId);
        }
    }

    useEffect(() => {
        addCurrentUserToChat()
        getConversations();
       
    }, [currentUserId]);

    useEffect(() => {
        setCurrentView('Chat');
        localStorage.setItem('currentView', 'Chat');

        connectToSocket();

        return () => {
            socket.current.disconnect();
        };
    }, []);

    const chatConversationList = conversations.map((conv, index) => (
        <div
            onClick={() => {
                setActiveChat(conv);
            }}
            key={index}
            className="cursor-pointer animate-popInAnimation"
        >
            <ChatConversation
                conversation={conv}
                currentUserId={currentUserId}
            />
        </div>
    ));

    if (loading) {
        return (
            <div className="flex flex-col gap-4 h-44 md:p-4 lg:w-full lg:justify-around shadow-lg bg-canvas">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-[calc(100vh_-_5rem)] lg:min-h-full md:p-4 pb-4  bg-canvas shadow-lg">
            <div
                className={`${
                    loading ? 'flex' : 'hidden'
                } flex-col justify-center items-center w-full h-[calc(100vh_-_7rem)] py-4 bg-canvas`}
            >
                <h1 className="font-bold">getting chat data!</h1>
                <LoadingSpinner />
            </div>
            <div
                className={`${
                    loading ? 'hidden' : 'md:grid'
                } flex flex-col grid-cols-[1fr,2fr] h-full gap-8`}
            >
                <div className="flex md:h-fit sticky top-2 md:flex-col overflow-y-auto lg:overflow-hidden gap-2 lg:gap-0 w-screen md:w-full p-2 lg:p-0">
                    {chatConversationList}
                </div>
                <div className="flex flex-col gap-8 md:px-4">
                    {activeChat ? (
                        <Chatroom
                            chatId={activeChatId}
                            partnerId={chatPartnerId}
                            socket={socket.current}
                        />
                    ) : (
                        'No conversation selected!'
                    )}
                </div>
            </div>
        </div>
    );
}
