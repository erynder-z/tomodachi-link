import React from 'react';

type FriendOnlyInfoSectionProps = {
    displayName: string;
};

export default function FriendOnlyInfoSection({
    displayName,
}: FriendOnlyInfoSectionProps) {
    return (
        <div className="text-xs text-right">
            This poll can only be answered by {displayName}'s friends.
        </div>
    );
}
