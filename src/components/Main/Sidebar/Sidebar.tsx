import React from 'react';
import UserListSome from '../UserList/UserListSome/UserListSome';
import { CurrentViewType } from '../../../types/currentViewType';
import UserListAll from '../UserList/UserListAll/UserListAll';
import OnlineUsersList from '../Chat/ChatOnlineUsersList/ChatOnlineUsersList';
import { Socket } from 'socket.io-client';
import { TbLayoutSidebarLeftExpand } from 'react-icons/tb';
import { ChatConversationType } from '../../../types/chatConversationType';

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
    const sidebarContent = () => {
        if (currentView === 'Friends') {
            return <UserListAll />;
        } else if (currentView === 'Chat') {
            return (
                <OnlineUsersList
                    socket={socket}
                    setActiveChat={setActiveChat}
                />
            );
        } else {
            return <UserListSome />;
        }
    };

    return (
        <aside
            className={`flex flex-col flex-none w-60  h-[calc(100vh_-_3rem)] lg:h-full fixed lg:sticky top-0 right-0 transition-transform duration-300 z-40 bg-canvas ${
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
