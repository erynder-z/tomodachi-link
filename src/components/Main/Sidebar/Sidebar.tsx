import React from 'react';
import UserListSome from '../UserList/UserListSome/UserListSome';
import { CurrentViewType } from '../../../types/currentViewType';
import UserListAll from '../UserList/UserListAll/UserListAll';
import OnlineUsersList from '../Chat/ChatOnlineUsersList/ChatOnlineUsersList';
import { Socket } from 'socket.io-client';

type SidebarProps = {
    currentView: CurrentViewType;
    showSidebar: boolean;
    socket: Socket | undefined;
};

export default function Sidebar({
    currentView,
    showSidebar,
    socket,
}: SidebarProps) {
    const sidebarContent = () => {
        if (currentView === 'Friends') {
            return <UserListAll />;
        } else if (currentView === 'Chat') {
            return <OnlineUsersList socket={socket} />;
        } else {
            return <UserListSome />;
        }
    };

    return (
        <aside
            className={`flex flex-none w-60  h-[calc(100vh_-_3rem)] lg:h-full fixed lg:sticky top-0 right-0 transition-transform duration-300 z-50 ${
                !showSidebar
                    ? 'transform translate-x-full lg:translate-x-0'
                    : ''
            }`}
        >
            {sidebarContent()}
        </aside>
    );
}
