import { useEffect, useState } from 'react';
import UserListSome from '../../Main/UserList/UserListSome/UserListSome';
import UserListAll from '../../Main/UserList/UserListAll/UserListAll';
import ChatOnlineUsersList from '../../Main/Chat/ChatOnlineUsersList/ChatOnlineUsersList';
import { Socket } from 'socket.io-client';
import { TbLayoutSidebarLeftExpand } from 'react-icons/tb';
import { ChatMemberType } from '../../../types/chatTypes';
import { useLocation } from 'react-router-dom';
import { SearchModeType } from '../../../types/searchTypes';

type SidebarProps = {
    showSidebar: boolean;
    toggleSidebar?: () => void;
    socket: Socket | undefined;
    setShouldOverlaysShow: React.Dispatch<
        React.SetStateAction<{
            searchOverlay: boolean;
            editUserDataModal: boolean;
            mobileOptionsModal: boolean;
            guestAccountOverlay: boolean;
            introOverlay: boolean;
        }>
    >;
    setSearchMode: React.Dispatch<React.SetStateAction<SearchModeType>>;
};

/**
 * React component for rendering the sidebar with dynamic content based on the route.
 *
 * @component
 * @param {SidebarProps} props - The component props.
 * @param {boolean} props.showSidebar - Indicates whether the sidebar should be visible.
 * @param {Function} [props.toggleSidebar] - Function to toggle the visibility of the sidebar.
 * @param {Socket} props.socket - The socket for real-time communication.
 * @param {Function} props.setShouldOverlaysShow - Setter function for controlling overlay visibility.
 * @param {Function} props.setSearchMode - Setter function for controlling search mode.
 * @returns {JSX.Element} The rendered Sidebar component.
 */
export default function Sidebar({
    showSidebar,
    toggleSidebar,
    socket,
    setShouldOverlaysShow,
    setSearchMode,
}: SidebarProps): JSX.Element {
    const [onlineUsers, setOnlineUsers] = useState<ChatMemberType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const location = useLocation();
    const pathname = location.pathname;
    const routeName = pathname.split('/').pop();

    let content = null;

    /**
     * Function to get online users from the server using the socket.
     *
     * @function
     * @returns {void}
     */
    const getOnlineUsers = (): void => {
        socket?.on('getUsers', (users: ChatMemberType[]) => {
            setOnlineUsers(users);
            setLoading(false);
        });
    };

    /**
     * useEffect hook to get online users once the socket has been initialized.
     *
     * @effect
     * @returns {void}
     */
    useEffect(() => {
        getOnlineUsers();
    }, [socket]);

    /**
     * Switch statement to determine the content based on the route name.
     *
     * @type {JSX.Element}
     */
    switch (routeName) {
        case 'friends':
            content = (
                <UserListAll
                    setShouldOverlaysShow={setShouldOverlaysShow}
                    setSearchMode={setSearchMode}
                />
            );
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

    /**
     * JSX Element representing the sidebar with dynamic content.
     *
     * @type {JSX.Element}
     */
    return (
        <aside
            className={`flex flex-col w-60 h-[calc(100vh-_3rem)] lg:h-full fixed lg:sticky top-0 right-0 transition-transform duration-300 bg-card dark:bg-cardDark text-regularText dark:text-regularTextDark rounded lg:rounded-lg z-50 md:z-auto ${
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
