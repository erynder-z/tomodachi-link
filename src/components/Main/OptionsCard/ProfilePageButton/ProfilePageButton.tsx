import React from 'react';
import { TbUserCircle } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import useUserData from '../../../../hooks/useUserData';
import Badge from '../Badge/Badge';

export default function ProfilePageButton() {
    const { userData } = useUserData();
    const { pending_friend_requests } = userData || {};
    const numberOfPendingFriendRequests = pending_friend_requests?.length;
    return (
        <Link
            to={'/mypage'}
            className="relative cursor-pointer hover:drop-shadow-md hover:text-blue-400"
        >
            <TbUserCircle size="1.5em" />
            {numberOfPendingFriendRequests ? (
                <Badge numberToShow={numberOfPendingFriendRequests} />
            ) : null}
        </Link>
    );
}
