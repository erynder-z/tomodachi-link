import React from 'react';
import UserListSome from '../UserList/UserListSome/UserListSome';
import { CurrentViewType } from '../../../types/currentViewType';
import UserListAll from '../UserList/UserListAll/UserListAll';

type SidebarProps = {
    currentView: CurrentViewType;
};

export default function Sidebar({ currentView }: SidebarProps) {
    return currentView === 'Friends' ? <UserListAll /> : <UserListSome />;
}
