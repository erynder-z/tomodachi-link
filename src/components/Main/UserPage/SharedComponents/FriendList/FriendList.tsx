import React from 'react';
import FriendListItem from './FriendListItem/FriendListItem';
import { FriendDataType } from '../../../../../types/friendTypes';
import { Link } from 'react-router-dom';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { motion } from 'framer-motion';

type FriendListProps = {
    friendData: FriendDataType[] | null;
    userId: string | undefined;
};

/**
 * React component for rendering a list of friends with a "See All" button.
 *
 * @component
 * @param {FriendListProps} props - The component props.
 * @param {FriendDataType[] | null} props.friendData - An array containing data of friends.
 * @param {string | undefined} props.userId - The ID of the user for whom the friend list is being displayed.
 * @returns {JSX.Element} The rendered FriendList component.
 */
function FriendList({ friendData, userId }: FriendListProps): JSX.Element {
    const numberOfFriends = friendData?.length ?? 0;

    /**
     * A randomized list of friend items, limited to 9 items.
     *
     * @type {JSX.Element[] | undefined}
     */
    const RandomFriendList: JSX.Element[] | undefined = friendData
        ?.sort(() => 0.5 - Math.random())
        .slice(0, 9)
        .sort((a, b) => a.firstName.localeCompare(b.lastName))
        .map((friend) => (
            <FriendListItem key={friend._id} friendData={friend} />
        ));

    /**
     * JSX Element representing the content when there are no friends.
     *
     * @type {JSX.Element}
     */
    const NoFriendsContent: JSX.Element = (
        <span className="text-sm font-medium text-center">
            Nothing here yet
        </span>
    );

    /**
     * JSX Element representing the "See All" button.
     *
     * @type {JSX.Element}
     */
    const SeeAllFriendsButton: JSX.Element = (
        <motion.button whileTap={{ scale: 0.97 }}>
            <Link
                to={`/users/${userId}/friends/list`}
                state={{ friendData: friendData }}
                className="flex items-center justify-center md:justify-start gap-2 w-full md:w-fit bg-button dark:bg-buttonDark hover:bg-buttonHover dark:hover:bg-buttonDarkHover text-regularTextDark rounded  px-2 py-1 mt-4 text-sm"
            >
                See all <MdKeyboardDoubleArrowRight size="1.25em" />
            </Link>
        </motion.button>
    );

    /**
     * JSX Element representing the FriendList component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="px-4 md:px-0">
            <h1 className="text-base font-bold">Friends</h1>
            <div className="animate-inAnimation grid grid-cols-3 gap-4">
                {friendData && numberOfFriends > 0
                    ? RandomFriendList
                    : NoFriendsContent}
            </div>
            {numberOfFriends > 9 && SeeAllFriendsButton}
        </div>
    );
}

export default React.memo(FriendList);
