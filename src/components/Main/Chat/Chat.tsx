import React, { useEffect, useRef, useState } from 'react';
import { CurrentViewType } from '../../../types/currentViewType';
import useCurrentUserData from '../../../hooks/useCurrentUserData';
import { fetchChatConversation } from '../../../utilities/fetchChatConversation';
import useAuth from '../../../hooks/useAuth';
import useInfoCard from '../../../hooks/useInfoCard';
import LoadingSpinner from '../../UiElements/LoadingSpinner/LoadingSpinner';
import { ChatConversationType } from '../../../types/chatConversationType';
import Chatroom from './Chatroom/Chatroom';
import { Socket } from 'socket.io-client';
import ChatConversationList from './ChatConversationList/ChatConversationList';
import useNotificationBubblesContext from '../../../hooks/useNotificationBubblesContext';
import { motion } from 'framer-motion';

type ChatProps = {
    setCurrentView: React.Dispatch<React.SetStateAction<CurrentViewType>>;
    socket: Socket | undefined;
};

export default function Chat({ setCurrentView, socket }: ChatProps) {
    const { token } = useAuth();
    const { currentUserData } = useCurrentUserData();
    const { setInfo } = useInfoCard();
    const {
        conversationsWithUnreadMessages,
        setConversationsWithUnreadMessages,
        activeChat,
        setActiveChat,
    } = useNotificationBubblesContext();

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

    const handleChatConversationClick = (
        conversation: ChatConversationType
    ) => {
        setActiveChat(conversation);

        const hasUnreadMessage = conversationsWithUnreadMessages.includes(
            conversation._id
        );

        if (hasUnreadMessage) {
            setConversationsWithUnreadMessages((prevUnreadMessages) =>
                prevUnreadMessages.filter((id) => id !== conversation._id)
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

    const LoadingContent = (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col justify-center items-center w-full h-[calc(100vh_-_2rem)] py-4 bg-card dark:bg-cardDark ext-regularText dark:text-regularTextDark"
        >
            <LoadingSpinner />
        </motion.div>
    );

    const ChatContent = (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col min-h-[calc(100vh_-_3rem)] lg:min-h-full md:p-4 pb-4 bg-background2 dark:bg-background2Dark shadow-lg rounded lg:rounded-lg"
        >
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

                <div className="flex flex-col gap-8 ">
                    {activeChat ? (
                        <motion.div
                            key={activeChat?._id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="h-full"
                        >
                            <Chatroom
                                chatId={activeChatId}
                                partnerId={chatPartnerId}
                                socket={socket}
                            />
                        </motion.div>
                    ) : (
                        <div className="flex justify-center items-center text-3xl font-bold text-gray-400 text-center h-[calc(100vh_-_10rem)]  lg:h-[calc(100vh_-_5rem)]">
                            No conversation selected
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );

    return loading ? LoadingContent : ChatContent;
}
