import React from 'react';
import FriendListItem from './FriendListItem/FriendListItem';
import { FriendDataType } from '../../../../../types/friendDataType';
import { Link } from 'react-router-dom';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';

type FriendListProps = {
    friendData: FriendDataType[] | null;
    userId: string | undefined;
};

export default function FriendList({ friendData, userId }: FriendListProps) {
    const numberOfFriends = friendData?.length ?? 0;

    const randomFriendList = friendData
        ?.sort(() => 0.5 - Math.random()) // Shuffle the sorted array randomly
        .slice(0, 9) // Get the first 9 elements from the shuffled array
        .sort((a, b) => a.firstName.localeCompare(b.lastName)) // Sort the friendData array alphabetically by name
        .map((friend) => (
            <FriendListItem key={friend._id} friendData={friend} />
        ));

    return (
        <div>
            <h1 className="font-bold">Friends</h1>
            <div className="animate-inAnimation grid grid-cols-3 gap-4">
                {friendData && numberOfFriends > 0 ? (
                    randomFriendList
                ) : (
                    <span className="text-sm font-medium text-center">
                        Nothing here yet
                    </span>
                )}
            </div>
            {numberOfFriends > 9 && (
                <Link
                    to={`/users/${userId}/friends/list`}
                    state={{ friendData: friendData }}
                    className="flex items-center justify-center md:justify-start gap-2 w-full md:w-fit  bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 mt-4 text-sm"
                >
                    See all <MdKeyboardDoubleArrowRight size="1.25em" />
                </Link>
            )}
        </div>
    );
}
