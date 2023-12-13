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

export default function ShowPeopleInThisFeed({
    minimalPosts,
}: ShowPeopleInThisFeedProps) {
    const { token } = useAuth();
    const { currentUserData } = useCurrentUserData();
    const { friendData, friendIDs } = useFriendData();
    const [feedUsers, setFeedUsers] = useState<MinimalUserTypes[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const isInitialLoad = useRef(true);

    const currentUserId = currentUserData?._id;

    const getIdsOfPeopleInFeed = () => {
        const postOwnerIds = minimalPosts.map((post) => post?.owner?._id);
        const filteredIds = postOwnerIds.filter(
            (id) => friendIDs.includes(id) || currentUserId === id
        );
        return [...new Set(filteredIds)];
    };

    const handleGetUserDetails = (ids: string[]) => {
        if (currentUserId && ids.includes(currentUserId)) {
            const minimalCurrentUser: MinimalUserTypes =
                formatUserData(currentUserData);
            setFeedUsers([minimalCurrentUser]);
        }

        if (friendData) {
            const users = friendData.filter((user) => ids.includes(user._id));
            const formattedFriendData = users.map((user) =>
                formatUserData(user)
            );
            setFeedUsers((prevUsers) => [
                ...prevUsers,
                ...formattedFriendData.filter(
                    (user) => !prevUsers.some((u) => u._id === user._id)
                ),
            ]);
            setLoading(false);
        }
    };

    const formatUserData = (
        user: FriendDataType | CurrentUserDataType
    ): MinimalUserTypes => {
        return {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            userpic: user.userpic,
        };
    };

    useEffect(() => {
        if (isInitialLoad.current) {
            setLoading(true);
            isInitialLoad.current = false;
        } else {
            if (minimalPosts.length === 0) {
                setFeedUsers([]);
                setLoading(false);
            } else if (token) {
                const idsOfPeopleInFeed = getIdsOfPeopleInFeed();
                if (idsOfPeopleInFeed.length > 0) {
                    handleGetUserDetails(idsOfPeopleInFeed);
                } else {
                    setLoading(false);
                }
            }
        }
    }, [friendIDs, minimalPosts, token]);

    const LoadingContent = (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col md:col-span-2 justify-center items-center gap-2 md:gap-8 w-full h-full md:py-4 text-regularText dark:text-regularTextDark"
        >
            <LoadingSpinner message="Getting users in feed..." />
        </motion.div>
    );

    const ShowPeopleInFeedContent = (
        <div className="flex md:flex-col gap-4 w-full lg:max-h-[calc(100vh_-_2rem)] p-2 lg:p-0">
            {feedUsers.length > 0 ? (
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
            ) : (
                <>
                    <span className="hidden md:flex justify-center text-2xl w-full">
                        👉
                    </span>
                    <span className="md:hidden flex justify-center text-2xl">
                        👇
                    </span>
                </>
            )}
        </div>
    );

    return (
        <div className="block sticky top-9 md:top-0 h-fit w-full min-w-0 bg-background2 dark:bg-background2Dark text-regularText dark:text-regularTextDark z-10 ">
            {loading ? LoadingContent : ShowPeopleInFeedContent}
        </div>
    );
}
