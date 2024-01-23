type FriendOnlyInfoSectionProps = {
    displayName: string;
};

/**
 * Functional component for rendering information about a friend-only poll.
 *
 * @component
 * @param {FriendOnlyInfoSectionProps} props - The props object.
 * @return {JSX.Element} The rendered FriendOnlyInfoSection component.
 */
export default function FriendOnlyInfoSection({
    displayName,
}: FriendOnlyInfoSectionProps): JSX.Element {
    /**
     * The rendered FriendOnlyInfoSection component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="text-xs text-right">
            This poll can only be answered by {displayName}'s friends.
        </div>
    );
}
