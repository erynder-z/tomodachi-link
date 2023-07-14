import React from 'react';
import UserListSome from '../UserList/UserListSome/UserListSome';
import { CurrentViewType } from '../../../types/currentViewType';
import UserListAll from '../UserList/UserListAll/UserListAll';
import OnlineUsersList from '../UserList/ChatOnlineUsersList/ChatOnlineUsersList';
import { Socket } from 'socket.io-client';

type SidebarProps = {
    currentView: CurrentViewType;
    socket: Socket | undefined;
};

export default function Sidebar({ currentView, socket }: SidebarProps) {
    if (currentView === 'Friends') {
        return <UserListAll />;
    } else if (currentView === 'Chat') {
        return <OnlineUsersList socket={socket} />;
    } else {
        return <UserListSome />;
    }
}
