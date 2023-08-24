import React, { useEffect, useRef, useState } from 'react';
import { CurrentViewType } from '../../../../types/currentViewType';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';
import { fetchChatConversation } from '../../../../utilities/fetchChatConversation';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import LoadingSpinner from '../../../UiElements/LoadingSpinner/LoadingSpinner';
import { ChatConversationType } from '../../../../types/chatConversationType';
import Chatroom from '../Chatroom/Chatroom';
import { Socket } from 'socket.io-client';
import ChatConversationList from '../ChatConversationList/ChatConversationList';

type ChatLobbyProps = {
    setCurrentView: React.Dispatch<React.SetStateAction<CurrentViewType>>;
    socket: Socket | undefined;
    activeChat: ChatConversationType | null;
    setActiveChat: React.Dispatch<
        React.SetStateAction<ChatConversationType | null>
    >;
    conversationsWithUnreadMessages: string[];
    setConversationsWithUnreadMessages: React.Dispatch<
        React.SetStateAction<string[]>
    >;
};

export default function ChatLobby({
    setCurrentView,
    socket,
    activeChat,
    setActiveChat,
    conversationsWithUnreadMessages,
    setConversationsWithUnreadMessages,
}: ChatLobbyProps) {
    const { token } = useAuth();
    const { currentUserData } = useCurrentUserData();
    const { setInfo } = useInfoCard();

    const [conversations, setConversations] = useState<ChatConversationType[]>(
        []
    );
    const [loading, setLoading] = useState<boolean>(true);

    const shouldSetCurrentView = useRef(true);

    const currentUserId = currentUserData?._id;
    const activeChatId = activeChat?._id;
    const chatPartnerId = activeChat?.members.find(
        (member) => member !== currentUserId
    );

    const getConversations = async () => {
        if (currentUserId && token) {
            const response = await fetchChatConversation(token, setInfo);
            setConversations(response);
            setLoading(false);
        }
    };

    const handleChatConversationClick = (conv: ChatConversationType) => {
        setActiveChat(conv);

        const hasUnreadMessage = conversationsWithUnreadMessages.includes(
            conv._id
        );

        if (hasUnreadMessage) {
            setConversationsWithUnreadMessages((prevUnreadMessages) =>
                prevUnreadMessages.filter((id) => id !== conv._id)
            );
        }
    };

    useEffect(() => {
        getConversations();
    }, [currentUserId]);

    useEffect(() => {
        if (activeChat) {
            setActiveChat(activeChat);
            getConversations();
        }
    }, [activeChat]);

    useEffect(() => {
        if (shouldSetCurrentView.current === true) {
            setCurrentView('Chat');
            localStorage.setItem('currentViewOdinBook', 'Chat');

            return () => {
                setActiveChat(null);
            };
        }
        return () => {
            shouldSetCurrentView.current = false;
        };
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col gap-4 h-44 md:p-4 lg:w-full lg:justify-around shadow-lg bg-card dark:bg-cardDark">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-[calc(100vh_-_5rem)] lg:min-h-full md:p-4 pb-4 bg-background2 dark:bg-background2Dark shadow-lg rounded lg:rounded-lg">
            <div
                className={`${
                    loading ? 'flex' : 'hidden'
                } flex-col justify-center items-center w-full h-[calc(100vh_-_7rem)] py-4 bg-card dark:bg-cardDark`}
            >
                <h1 className="font-bold">getting chat data!</h1>
                <LoadingSpinner />
            </div>
            <div
                className={`${
                    loading ? 'hidden' : 'md:grid'
                } grid-cols-[1fr,2fr] md:min-h-[calc(100vh_-_3rem)] gap-8 bg-background2 dark:bg-background2Dark rounded lg:rounded-lg`}
            >
                <ChatConversationList
                    conversations={conversations}
                    conversationsWithUnreadMessages={
                        conversationsWithUnreadMessages
                    }
                    handleChatConversationClick={handleChatConversationClick}
                    currentUserId={currentUserId}
                />

                <div className="flex flex-col gap-8">
                    {activeChat ? (
                        <Chatroom
                            chatId={activeChatId}
                            partnerId={chatPartnerId}
                            socket={socket}
                        />
                    ) : (
                        <div className="flex justify-center items-center text-3xl font-bold text-gray-400 text-center h-[calc(100vh_-_10rem)]  lg:h-[calc(100vh_-_5rem)]">
                            No conversation selected
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
