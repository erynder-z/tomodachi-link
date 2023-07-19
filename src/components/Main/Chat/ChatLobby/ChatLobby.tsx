import React, { useEffect, useState } from 'react';
import { CurrentViewType } from '../../../../types/currentViewType';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';
import { fetchChatConversation } from '../../../../utilities/fetchChatConversation';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner';
import ChatConversation from '../ChatConversation/ChatConversation';
import { ChatConversationType } from '../../../../types/chatConversationType';
import Chatroom from '../Chatroom/Chatroom';
import { Socket } from 'socket.io-client';

type ChatLobbyProps = {
    setCurrentView: React.Dispatch<React.SetStateAction<CurrentViewType>>;
    socket: Socket | undefined;
    activeChat: ChatConversationType | null;
    setActiveChat: React.Dispatch<
        React.SetStateAction<ChatConversationType | null>
    >;
};

export default function ChatLobby({
    setCurrentView,
    socket,
    activeChat,
    setActiveChat,
}: ChatLobbyProps) {
    const { token } = useAuth();
    const { currentUserData } = useCurrentUserData();
    const { setInfo } = useInfoCard();

    const [conversations, setConversations] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const currentUserId = currentUserData?._id;
    const activeChatId = activeChat?._id;
    const chatPartnerId = activeChat?.members.find(
        (member) => member !== currentUserId
    );

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
        if (currentUserData && socket) {
            const userId = currentUserData?._id;
            socket.emit('addUser', userId);
        }
    };

    useEffect(() => {
        addCurrentUserToChat();
        getConversations();
    }, [currentUserId]);

    useEffect(() => {
        if (activeChat) {
            setActiveChat(activeChat);
            getConversations();
        }
    }, [activeChat]);

    useEffect(() => {
        setCurrentView('Chat');
        localStorage.setItem('currentView', 'Chat');
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
                            socket={socket}
                        />
                    ) : (
                        'No conversation selected!'
                    )}
                </div>
            </div>
        </div>
    );
}
