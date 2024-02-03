import React from 'react';
import { ChatConversationType } from './chatTypes';

export type InfoCardContextProviderProps = {
    children: React.ReactElement;
};

export type InfoCardContextProps = {
    info: InfoType | null;
    setInfo: (info: InfoType | null) => void;
};

export type InfoType = {
    typeOfInfo?: 'good' | 'bad' | 'neutral' | 'greeting';
    message: string;
    icon?: string;
};

export type NotificationBubblesContextProps = {
    conversationsWithUnreadMessages: string[];
    setConversationsWithUnreadMessages: (
        conversations: string[] | ((prev: string[]) => string[])
    ) => void;
    mutedConversations: string[];
    setMutedConversations: (
        conversations: string[] | ((prev: string[]) => string[])
    ) => void;
    activeChat: ChatConversationType | null;
    setActiveChat: (chat: ChatConversationType | null) => void;
};
