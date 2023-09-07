import React from 'react';
import FriendRequestListItem from './FriendRequestListItem/FriendRequestListItem';

type FriendRequestsProps = {
    pendingFriendRequests: string[];
    onFetchComplete: (nameOfComponent: string) => void;
};

export default function FriendRequests({
    pendingFriendRequests,
    onFetchComplete,
}: FriendRequestsProps) {
    let completedFetchCount = 0;

    const handleFetchComplete = () => {
        completedFetchCount++;

        if (completedFetchCount === pendingFriendRequests.length) {
            onFetchComplete('friendRequests');
        }
    };

    const friendRequestItemsList = pendingFriendRequests?.map(
        (requestingUserId) => (
            <FriendRequestListItem
                key={requestingUserId}
                friendRequestUserId={requestingUserId}
                handleFetchComplete={handleFetchComplete}
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
