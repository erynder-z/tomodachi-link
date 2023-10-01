import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from '../../../UiElements/LoadingSpinner/LoadingSpinner';
import { fetchMinimalUserData } from '../../../../utilities/fetchMinimalUserData';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import { MinimalUserTypes } from '../../../../types/otherUserTypes';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';
import FeedUserListItem from './FeedUserListItem/FeedUserListItem';
import { MinimalPostType } from '../../../../types/postTypes';

type ShowPeopleInThisFeedProps = {
    friendList: string[];
    minimalPosts: MinimalPostType[];
};

export default function ShowPeopleInThisFeed({
    friendList,
    minimalPosts,
}: ShowPeopleInThisFeedProps) {
    const { token } = useAuth();
    const { currentUserData } = useCurrentUserData();
    const { setInfo } = useInfoCard();
    const [feedUsers, setFeedUsers] = useState<MinimalUserTypes[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const isInitialLoad = useRef(true);

    const getIdsOfPeopleInFeed = () => {
        const newPeopleInFeed = new Set<string>();
        minimalPosts.forEach((post) => {
            if (
                friendList.includes(post?.owner?._id) ||
                currentUserData?._id === post?.owner?._id
            ) {
                newPeopleInFeed.add(post?.owner?._id);
            } else if (newPeopleInFeed.has(post?.owner?._id)) {
                newPeopleInFeed.delete(post?.owner?._id);
            }
        });
        return Array.from(newPeopleInFeed);
    };

    const handleGetUserDetails = async (ids: string[]) => {
        if (token) {
            const requests = ids.map((id) =>
                fetchMinimalUserData(token, id, setInfo)
            );
            const responses = await Promise.all(requests);
            setFeedUsers((prevUsers) => [
                ...prevUsers,
                ...responses.filter(
                    (user) => !prevUsers.some((u) => u._id === user._id)
                ),
            ]);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isInitialLoad.current) {
            setLoading(true);
            isInitialLoad.current = false;
        } else {
            if (minimalPosts.length === 0) {
                setLoading(false);
            } else if (token) {
                const idsOfPeopleInFeed = getIdsOfPeopleInFeed();
                if (idsOfPeopleInFeed.length > 0)
                    handleGetUserDetails(idsOfPeopleInFeed);
            }
        }
    }, [minimalPosts, token]);

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
        <div className="flex md:flex-col overflow-y-auto lg:overflow-hidden gap-4 lg:gap-0 w-full md:w-full p-2 lg:p-0">
            {feedUsers.length > 0 ? (
                <>
                    <h1 className="text-center flex">People in this feed:</h1>
                    {feedUsers.map((feedUser: MinimalUserTypes) => (
                        <motion.div
                            key={feedUser?._id}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <FeedUserListItem listItemData={feedUser} />
                        </motion.div>
                    ))}
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
        <div className="block sticky -top-1 lg:top-10 h-fit md:w-full bg-background2 dark:bg-background2Dark text-regularText dark:text-regularTextDark z-10">
            {loading ? LoadingContent : ShowPeopleInFeedContent}
        </div>
    );
}
