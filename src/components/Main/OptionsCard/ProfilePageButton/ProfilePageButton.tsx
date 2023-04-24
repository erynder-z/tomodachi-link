import React from 'react';
import { TbUserCircle } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';
import Badge from '../Badge/Badge';

export default function ProfilePageButton() {
    const { currentUserData } = useCurrentUserData();
    const { pending_friend_requests } = currentUserData || {};
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
