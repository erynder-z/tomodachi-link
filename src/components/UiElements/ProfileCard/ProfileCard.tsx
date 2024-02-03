import { useEffect, useState } from 'react';
import useCurrentUserData from '../../../hooks/useCurrentUserData';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { Socket } from 'socket.io-client';
import { ChatMemberType } from '../../../types/chatTypes';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

type ProfileCardProps = {
    socket: Socket | undefined;
};

/**
 * React component for rendering the user profile card.
 *
 * @component
 * @param {ProfileCardProps} props - The component props.
 * @param {Socket} props.socket - The socket for real-time communication.
 * @returns {JSX.Element} The rendered ProfileCard component.
 */
export default function ProfileCard({ socket }: ProfileCardProps): JSX.Element {
    const { currentUserData } = useCurrentUserData();
    const { firstName, lastName, userpic, friends } = currentUserData || {};
    const numberOfFriends = friends?.length;
    const userImage = userpic ? userpic?.data : undefined;

    const [matchedFriendsCount, setMatchedFriendsCount] = useState<number>(0);

    /**
     * useEffect hook to listen for user updates and calculate the number of matched friends.
     *
     * @effect
     * @returns {void}
     */
    useEffect(() => {
        if (socket) {
            socket.on('getUsers', (users: ChatMemberType[]) => {
                const matchedCount = friends?.filter((friend: string) =>
                    users.some((user) => user.userId === friend)
                ).length;

                setMatchedFriendsCount(matchedCount || 0);
            });

            return () => {
                socket.off('getUsers');
            };
        }
    }, [socket, friends]);

    /**
     * JSX Element representing the user image.
     *
     * @type {JSX.Element}
     */
    const UserImage: JSX.Element = (
        <img
            className="w-20 h-20 object-cover rounded-full mx-auto shadow-lg"
            src={`data:image/png;base64,${userImage}`}
            alt="User avatar"
        />
    );

    /**
     * JSX Element representing the user name.
     *
     * @type {JSX.Element}
     */
    const UserName: JSX.Element = (
        <p className="font-semibold text-xl my-5 break-all">
            {firstName} {lastName}
        </p>
    );

    /**
     * JSX Element representing the number of friends.
     *
     * @type {JSX.Element}
     */
    const FriendNumber: JSX.Element = <span> {numberOfFriends} Friends</span>;

    /**
     * JSX Element representing the link to the chat with online friends.
     *
     * @type {JSX.Element}
     */
    const LinkToChat: JSX.Element = (
        <>
            <Link
                data-tooltip-id="profile-friend-link-tooltip"
                data-tooltip-content="Go to chat"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
                to="/chat"
                className="text-regularText dark:text-regularTextDark text-xs"
            >
                {' '}
                ( {matchedFriendsCount} Online )
            </Link>
            <Tooltip
                id="profile-friend-link-tooltip"
                style={{ fontSize: '0.75rem', zIndex: 99 }}
            />
        </>
    );

    /**
     * JSX Element representing the loading content when user image is not available.
     *
     * @type {JSX.Element}
     */
    if (!userImage) {
        return (
            <div className="flex flex-col gap-4 h-44 md:p-4 lg:w-full lg:justify-around shadow-lg bg-card dark:bg-cardDark">
                <LoadingSpinner />
            </div>
        );
    }

    /**
     * JSX Element representing the overall profile card.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="flex w-full md:shadow-md">
            <div className="w-full text-center p-4 bg-card dark:bg-cardDark text-regularText dark:text-regularTextDark rounded lg:rounded-lg">
                {UserImage}
                {UserName}
                <p className="flex flex-col text-sm mb-2">
                    {FriendNumber}
                    {LinkToChat}
                </p>
            </div>
        </div>
    );
}
