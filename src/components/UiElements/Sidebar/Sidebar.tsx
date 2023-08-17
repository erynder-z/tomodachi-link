import React, { useEffect, useState } from 'react';
import UserListSome from '../../Main/UserList/UserListSome/UserListSome';
import { CurrentViewType } from '../../../types/currentViewType';
import UserListAll from '../../Main/UserList/UserListAll/UserListAll';
import OnlineUsersList from '../../Main/Chat/ChatOnlineUsersList/ChatOnlineUsersList';
import { Socket } from 'socket.io-client';
import { TbLayoutSidebarLeftExpand } from 'react-icons/tb';
import { ChatConversationType } from '../../../types/chatConversationType';
import { ChatMemberType } from '../../../types/chatMemberType';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

type SidebarProps = {
    currentView: CurrentViewType;
    showSidebar: boolean;
    toggleSidebar?: () => void;
    socket: Socket | undefined;
    setActiveChat: React.Dispatch<
        React.SetStateAction<ChatConversationType | null>
    >;
};

export default function Sidebar({
    currentView,
    showSidebar,
    toggleSidebar,
    socket,
    setActiveChat,
}: SidebarProps) {
    const [onlineUsers, setOnlineUsers] = useState<ChatMemberType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const sidebarContent = () => {
        if (currentView === 'Friends') {
            return <UserListAll />;
        } else if (currentView === 'Chat') {
            return loading ? (
                <div className="flex justify-center items-center w-full py-4">
                    <LoadingSpinner />
                </div>
            ) : (
                <OnlineUsersList
                    setActiveChat={setActiveChat}
                    onlineUsers={onlineUsers}
                />
            );
        } else {
            return <UserListSome />;
        }
    };

    useEffect(() => {
        if (socket) {
            socket.on('getUsers', (users: ChatMemberType[]) => {
                setOnlineUsers(users);
                setLoading(false);
            });

            return () => {
                socket.off('getUsers');
            };
        }
    }, [socket]);

    return (
        <aside
            className={`flex flex-col flex-none w-60  h-[calc(100vh_-_3rem)] lg:h-full fixed lg:sticky top-0 right-0 transition-transform duration-300 bg-card dark:bg-cardDark rounded lg:rounded-lg z-40 md:z-0 ${
                !showSidebar
                    ? 'transform translate-x-full lg:translate-x-0'
                    : ''
            }`}
        >
            {sidebarContent()}
            <div
                onClick={toggleSidebar}
                className="mt-auto flex justify-center items-center lg:hidden"
            >
                <TbLayoutSidebarLeftExpand className="text-2xl" />
            </div>
        </aside>
    );
}
