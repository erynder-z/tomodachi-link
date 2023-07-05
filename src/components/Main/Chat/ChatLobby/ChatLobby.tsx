import React, { useEffect } from 'react';
import { CurrentViewType } from '../../../../types/currentViewType';
import useFriendData from '../../../../hooks/useFriendData';

import useCurrentUserData from '../../../../hooks/useCurrentUserData';
import ChatUserList from '../ChaUserList/ChatUserList';

type ChatLobbyProps = {
    setCurrentView: React.Dispatch<React.SetStateAction<CurrentViewType>>;
};

export default function ChatLobby({ setCurrentView }: ChatLobbyProps) {
    const { currentUserData } = useCurrentUserData();
    const { friendData } = useFriendData();

    const currentUserId = currentUserData?._id;

    useEffect(() => {
        setCurrentView('Chat');
        localStorage.setItem('currentView', 'Chat');
    }, []);

    return (
        <div className="flex flex-col">
            <div>ChatLobby</div>
            <ChatUserList friendData={friendData} />
        </div>
    );
}
