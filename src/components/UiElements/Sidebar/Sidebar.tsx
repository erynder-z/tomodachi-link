import { useEffect, useState } from 'react';
import UserListSome from '../../Main/UserList/UserListSome/UserListSome';
import UserListAll from '../../Main/UserList/UserListAll/UserListAll';
import ChatOnlineUsersList from '../../Main/Chat/ChatOnlineUsersList/ChatOnlineUsersList';
import { Socket } from 'socket.io-client';
import { TbLayoutSidebarLeftExpand } from 'react-icons/tb';
import { ChatMemberType } from '../../../types/chatTypes';
import { useLocation } from 'react-router-dom';

type SidebarProps = {
    showSidebar: boolean;
    toggleSidebar?: () => void;
    socket: Socket | undefined;
};

export default function Sidebar({
    showSidebar,
    toggleSidebar,
    socket,
}: SidebarProps) {
    const [onlineUsers, setOnlineUsers] = useState<ChatMemberType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const location = useLocation();
    const pathname = location.pathname;
    const routeName = pathname.split('/').pop();

    let content = null;

    const getOnlineUsers = () => {
        socket?.on('getUsers', (users: ChatMemberType[]) => {
            setOnlineUsers(users);
            setLoading(false);
        });
    };

    useEffect(() => {
        getOnlineUsers();
    }, [socket]);

    switch (routeName) {
        case 'friends':
            content = <UserListAll />;
            break;
        case 'chat':
            content = (
                <ChatOnlineUsersList
                    onlineUsers={onlineUsers}
                    loading={loading}
                />
            );
            break;
        default:
            content = <UserListSome />;
            break;
    }

    return (
        <aside
            className={`flex flex-col w-60 h-[calc(100vh-_3rem)] lg:h-full fixed lg:sticky top-0 right-0 transition-transform duration-300 bg-card dark:bg-cardDark text-regularText dark:text-regularTextDark rounded lg:rounded-lg z-40  ${
                !showSidebar
                    ? 'transform translate-x-full lg:translate-x-0'
                    : ''
            }`}
        >
            {content}
            {toggleSidebar && (
                <div
                    onClick={toggleSidebar}
                    className="mt-auto flex justify-center items-center lg:hidden"
                >
                    <TbLayoutSidebarLeftExpand className="text-2xl" />
                </div>
            )}
        </aside>
    );
}
