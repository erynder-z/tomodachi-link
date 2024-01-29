import FriendRequestListItem from './FriendRequestListItem/FriendRequestListItem';

type FriendRequestsProps = {
    pendingFriendRequests: string[];
    onFetchComplete: (nameOfComponent: string) => void;
};

/**
 * React component for rendering a list of pending friend requests.
 *
 * @component
 * @param {FriendRequestsProps} props - The component props.
 * @param {string[]} props.pendingFriendRequests - Array of user IDs for pending friend requests.
 * @param {(nameOfComponent: string) => void} props.onFetchComplete - Callback function to handle fetch completion.
 * @returns {JSX.Element} The rendered FriendRequests component.
 */
export default function FriendRequests({
    pendingFriendRequests,
    onFetchComplete,
}: FriendRequestsProps): JSX.Element {
    let completedFetchCount = 0;

    /**
     * Handles the completion of fetching data for a FriendRequestListItem.
     *
     * @function
     * @returns {void}
     */
    const handleFetchComplete = (): void => {
        completedFetchCount++;

        if (completedFetchCount === pendingFriendRequests.length) {
            onFetchComplete('friendRequests');
        }
    };

    /**
     * Maps each requestingUserId to a FriendRequestListItem component.
     *
     * @type {JSX.Element[]}
     */
    const friendRequestItemsList: JSX.Element[] = pendingFriendRequests?.map(
        (requestingUserId) => (
            <FriendRequestListItem
                key={requestingUserId}
                friendRequestUserId={requestingUserId}
                handleFetchComplete={handleFetchComplete}
            />
        )
    );

    /**
     * JSX Element representing the list of pending friend requests.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="flex flex-col w-full text-sm">
            <h1 className="text-base font-bold">Pending friend requests:</h1>
            <div className="flex flex-col gap-6">{friendRequestItemsList}</div>
        </div>
    );
}
