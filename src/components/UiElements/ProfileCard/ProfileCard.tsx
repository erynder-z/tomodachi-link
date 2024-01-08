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

export default function ProfileCard({ socket }: ProfileCardProps) {
    const { currentUserData } = useCurrentUserData();
    const { firstName, lastName, userpic, friends } = currentUserData || {};
    const numberOfFriends = friends?.length;
    const userImage = userpic ? userpic?.data : undefined;

    const [matchedFriendsCount, setMatchedFriendsCount] = useState<number>(0);

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

    if (!userImage) {
        return (
            <div className="flex flex-col gap-4 h-44 md:p-4 lg:w-full lg:justify-around shadow-lg bg-card dark:bg-cardDark">
                <LoadingSpinner />
            </div>
        );
    }

    const UserImage = (
        <img
            className="w-20 h-20 object-cover rounded-full mx-auto shadow-lg"
            src={`data:image/png;base64,${userImage}`}
            alt="User avatar"
        />
    );

    const UserName = (
        <p className="font-semibold text-xl my-5 break-all">
            {firstName} {lastName}
        </p>
    );

    const FriendNumber = <span> {numberOfFriends} Friends</span>;

    const LinkToChat = (
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
