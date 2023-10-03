import { useEffect, useRef, useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import { fetchFeed } from '../../../../utilities/fetchFeed';
import LoadingSpinner from '../../../UiElements/LoadingSpinner/LoadingSpinner';
import ShowPeopleInThisFeed from '../ShowPeopleInThisFeed/ShowPeopleInThisFeed';
import { MinimalPostType } from '../../../../types/postTypes';
import NewPostInput from '../../Post/NewPostInput/NewPostInput';
import FeedPostList from './FeedPostList/FeedPostList';
import { motion } from 'framer-motion';

type FreedProps = {
    friendList: string[];
    isPaginationTriggered: boolean;
};

export default function Feed({
    friendList,
    isPaginationTriggered,
}: FreedProps) {
    const { token, authUser } = useAuth();
    const { setInfo } = useInfoCard();
    const [minimalPosts, setMinimalPosts] = useState<MinimalPostType[]>([]);
    const [skip, setSkip] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isFeedRefreshing, setIsFeedRefreshing] = useState<boolean>(false);

    const shouldInitialize = useRef(true);

    const handleGetFeed = async () => {
        if (authUser && token) {
            const response = await fetchFeed(token, setInfo, skip);
            setMinimalPosts([...minimalPosts, ...response]);
            setLoading(false);
        }
    };

    const refreshFeed = async () => {
        setIsFeedRefreshing(true);
        setMinimalPosts([]);
        setSkip(0);
        if (authUser && token) {
            const response = await fetchFeed(token, setInfo, skip);
            setMinimalPosts([...response]);
            setLoading(false);
            setIsFeedRefreshing(false);
        }
    };

    useEffect(() => {
        if (minimalPosts) setSkip(minimalPosts.length);
    }, [isPaginationTriggered]);

    useEffect(() => {
        if (token && skip) handleGetFeed();
    }, [skip]);

    useEffect(() => {
        if (shouldInitialize.current) handleGetFeed();

        return () => {
            shouldInitialize.current = false;
        };
    }, []);

    const LoadingContent = (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col md:col-span-2 justify-center items-center w-full h-full py-4 gap-4 text-regularText dark:text-regularTextDark "
        >
            <LoadingSpinner message="Getting feed..." />
        </motion.div>
    );

    const FeedContent = (
        <>
            <ShowPeopleInThisFeed
                friendList={friendList}
                minimalPosts={minimalPosts}
            />
            <div className="flex flex-col gap-4 pb-4">
                <FeedPostList
                    posts={minimalPosts}
                    isFeedRefreshing={isFeedRefreshing}
                    onPostChange={refreshFeed}
                />
            </div>
        </>
    );

    return (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col h-1/4 md:h-auto w-full gap-8 "
        >
            <NewPostInput handleRefreshPosts={refreshFeed} />
            <div className="flex flex-col md:grid grid-cols-[1fr,2fr] gap-8 justify-center min-h-[calc(100vh_-_18rem)] bg-background2 dark:bg-background2Dark text-regularText dark:text-regularTextDark">
                {loading ? LoadingContent : FeedContent}
            </div>
        </motion.div>
    );
}
