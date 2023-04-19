import React from 'react';
import FriendRequestListItem from './FriendRequestListItem/FriendRequestListItem';

type Props = {
    pendingFriendRequests: string[];
};

export default function MyFriendRequests({ pendingFriendRequests }: Props) {
    const friendRequestItemsList = pendingFriendRequests?.map(
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
