import React from 'react';
import FriendListItem from './FriendListItem/FriendListItem';
import { FriendDataType } from '../../../../../types/friendTypes';
import { Link } from 'react-router-dom';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';

type FriendListProps = {
    friendData: FriendDataType[] | null;
    userId: string | undefined;
};

function FriendList({ friendData, userId }: FriendListProps) {
    const numberOfFriends = friendData?.length ?? 0;

    const RandomFriendList = friendData
        ?.sort(() => 0.5 - Math.random())
        .slice(0, 9)
        .sort((a, b) => a.firstName.localeCompare(b.lastName))
        .map((friend) => (
            <FriendListItem key={friend._id} friendData={friend} />
        ));

    const NoFriendsContent = (
        <span className="text-sm font-medium text-center">
            Nothing here yet
        </span>
    );

    const SeeAllFriendsButton = (
        <Link
            to={`/users/${userId}/friends/list`}
            state={{ friendData: friendData }}
            className="flex items-center justify-center md:justify-start gap-2 w-full md:w-fit bg-button dark:bg-buttonDark hover:bg-buttonHover dark:hover:bg-buttonDarkHover text-regularTextDark rounded  px-2 py-1 mt-4 text-sm"
        >
            See all <MdKeyboardDoubleArrowRight size="1.25em" />
        </Link>
    );

    return (
        <div>
            <h1 className="font-bold">Friends</h1>
            <div className="animate-inAnimation grid grid-cols-3 gap-4">
                {friendData && numberOfFriends > 0
                    ? RandomFriendList
                    : NoFriendsContent}
            </div>
            {numberOfFriends > 2 && SeeAllFriendsButton}
        </div>
    );
}

export default React.memo(FriendList);
