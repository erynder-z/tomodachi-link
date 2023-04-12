import React from 'react';
import useUserData from '../../../../hooks/useUserData';
import FriendRequestListItem from './FriendRequestListItem/FriendRequestListItem';

export default function MyFriendRequests() {
    const { userData } = useUserData();

    const { pending_friend_requests } = userData || {};

    const friendRequestItemsList = pending_friend_requests?.map(
        (requestingUserId) => (
            <FriendRequestListItem
                key={requestingUserId}
                friendRequestUserId={requestingUserId}
            />
        )
    );

    return (
        <div className="flex flex-col gap-8 w-full text-sm">
            <h1 className="font-bold underline">Pending friend requests:</h1>
            {friendRequestItemsList}
        </div>
    );
}
