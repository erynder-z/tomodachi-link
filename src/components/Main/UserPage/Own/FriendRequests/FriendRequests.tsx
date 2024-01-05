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
        <div className="flex flex-col w-full text-sm">
            <h1 className="text-base font-bold">Pending friend requests:</h1>
            <div className="flex flex-col gap-6">{friendRequestItemsList}</div>
        </div>
    );
}
