import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from '../../../UiElements/LoadingSpinner/LoadingSpinner';
import useAuth from '../../../../hooks/useAuth';
import { MinimalUserTypes } from '../../../../types/otherUserTypes';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';
import FeedUserListItem from './FeedUserListItem/FeedUserListItem';
import { MinimalPostType } from '../../../../types/postTypes';
import useFriendData from '../../../../hooks/useFriendData';
import { FriendDataType } from '../../../../types/friendTypes';
import { CurrentUserDataType } from '../../../../types/currentUserTypes';

type ShowPeopleInThisFeedProps = {
    minimalPosts: MinimalPostType[];
};

/**
 * ShowPeopleInThisFeed component to display users who have posts in the feed.
 *
 * @component
 * @param {ShowPeopleInThisFeedProps} props - The props object.
 * @param {MinimalPostType[]} props.minimalPosts - An array of minimal post data.
 * @returns {JSX.Element} The rendered ShowPeopleInThisFeed component.
 */
export default function ShowPeopleInThisFeed({
    minimalPosts,
}: ShowPeopleInThisFeedProps): JSX.Element {
    const { currentUserData } = useCurrentUserData();
    const { friendData, friendIDs } = useFriendData();
    const [feedUsers, setFeedUsers] = useState<MinimalUserTypes[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const currentUserId = currentUserData?._id;
    const hasEmptyFeed = minimalPosts.length === 0;

    /**
     * Get the unique user IDs of people in the feed.
     *
     * @function
     * @returns {Promise<string[]>} A promise resolving to an array of unique user IDs in the feed.
     */
    const getIdsOfPeopleInFeed = async (): Promise<string[]> => {
        if (!minimalPosts.length) {
            return [];
        }

        const friendIDsSet = new Set(friendIDs);
        const postOwnerIds = minimalPosts.map((post) => post?.owner?._id);

        const filteredIds = postOwnerIds.filter(
            (id) => friendIDsSet.has(id) || currentUserId === id
        );

        return [...new Set(filteredIds)];
    };

    /**
     * Get details of users in the feed based on their IDs.
     *
     * @function
     * @param {string[]} ids - An array of user IDs.
     * @return {void} No return value.
     */
    const handleGetUserDetails = (ids: string[]): void => {
        if (!currentUserId || !ids.length) {
            return;
        }

        const idsSet = new Set(ids);

        if (idsSet.has(currentUserId)) {
            const minimalCurrentUser: MinimalUserTypes =
                formatUserData(currentUserData);
            setFeedUsers([minimalCurrentUser]);
        }

        if (friendData) {
            const users = friendData.filter((user) => idsSet.has(user._id));
            const formattedFriendData = users.map((user) =>
                formatUserData(user)
            );
            setFeedUsers((prevUsers) => [
                ...prevUsers,
                ...formattedFriendData.filter(
                    (user) => !prevUsers.some((u) => u._id === user._id)
                ),
            ]);
        }
    };

    /**
     * Format user data into MinimalUserTypes.
     *
     * @function
     * @param {FriendDataType | CurrentUserDataType} user - User data.
     * @return {MinimalUserTypes} Formatted minimal user data.
     */
    const formatUserData = (
        user: FriendDataType | CurrentUserDataType
    ): MinimalUserTypes => {
        return {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            userpic: user.userpic,
            accountType: user.accountType,
        };
    };

    /**
     * Effect to handle user details fetching and loading states.
     *
     * @effect
     * @return {void} No return value.
     */
    useEffect(() => {
        if (hasEmptyFeed) {
            setFeedUsers([]);
            setLoading(false);
        } else {
            const fetchData = async () => {
                const idsOfPeopleInFeed = await getIdsOfPeopleInFeed();
                if (idsOfPeopleInFeed.length > 0)
                    handleGetUserDetails(idsOfPeopleInFeed);
            };

            fetchData().then(() => setLoading(false));
        }
    }, [friendIDs, minimalPosts]);

    /**
     * Loading content displayed while fetching users in the feed.
     *
     * @type {JSX.Element}
     */
    const LoadingContent: JSX.Element = (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col md:col-span-2 justify-center items-center gap-2 md:gap-8 w-full h-full md:py-4 text-regularText dark:text-regularTextDark"
        >
            <LoadingSpinner message="Getting users in feed..." />
        </motion.div>
    );

    /**
     * Content displayed when there are people in the feed.
     *
     * @type {JSX.Element}
     */
    const ShowPeopleInFeedContent: JSX.Element = (
        <div className="flex md:flex-col gap-4 w-full lg:max-h-[calc(100vh_-_2rem)] p-2 lg:p-0">
            {hasEmptyFeed ? (
                <>
                    <span className="hidden md:flex justify-center text-2xl w-full">
                        👉
                    </span>
                    <span className="md:hidden flex justify-center text-2xl">
                        👇
                    </span>
                </>
            ) : (
                <>
                    <h1 className="flex justify-center items-center text-center text-xs md:text-base">
                        People in this feed:
                    </h1>
                    <div className="flex md:flex-col gap-4 w-full overflow-y-auto ">
                        {feedUsers
                            // sort items by occurrence in the feedUsers-array
                            .map((feedUser) => {
                                const index = minimalPosts.findIndex(
                                    (post) => post.owner?._id === feedUser._id
                                );
                                return { user: feedUser, index };
                            })
                            .sort((a, b) => a.index - b.index)
                            .map(({ user }) => (
                                <motion.div
                                    key={user._id}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    className="min-w-fit md:min-w-0 pb-2 md:pb-0"
                                >
                                    <FeedUserListItem listItemData={user} />
                                </motion.div>
                            ))}
                    </div>
                </>
            )}
        </div>
    );

    /**
     * Rendered ShowPeopleInThisFeed component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="block sticky top-9 md:top-0 h-fit w-full min-w-0 bg-background2 dark:bg-background2Dark text-regularText dark:text-regularTextDark z-10 ">
            {loading ? LoadingContent : ShowPeopleInFeedContent}
        </div>
    );
}
