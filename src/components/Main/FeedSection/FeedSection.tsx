import { useEffect, useRef, useState } from 'react';
import LoadingSpinner from '../../UiElements/LoadingSpinner/LoadingSpinner';
import Feed from './Feed/Feed';
import { motion } from 'framer-motion';
import RefreshFeedButton from './RefreshFeedButton/RefreshFeedButton';
import { backendFetch } from '../../../utilities/backendFetch';
import useAuth from '../../../hooks/useAuth';
import useInfoCard from '../../../hooks/useInfoCard';
import { MinimalPostType } from '../../../types/postTypes';

type FeedSectionProps = {
    isPaginationTriggered: boolean;
};

export default function FeedSection({
    isPaginationTriggered,
}: FeedSectionProps) {
    const { token, authUser } = useAuth();
    const { setInfo } = useInfoCard();
    const [loading, setLoading] = useState<boolean>(true);
    const [minimalPosts, setMinimalPosts] = useState<MinimalPostType[]>([]);
    const [skip, setSkip] = useState<number | null>(null);
    const [isFeedRefreshing, setIsFeedRefreshing] = useState<boolean>(false);

    const shouldInitialize = useRef(true);

    const handleGetFeed = async () => {
        if (authUser && token) {
            const apiEndpointURL = `/api/v1/feed?skip=${skip}`;
            const method = 'GET';
            const errorMessage = 'Unable to fetch feed!';

            const response = await backendFetch(
                token,
                setInfo,
                apiEndpointURL,
                method,
                errorMessage
            );
            setMinimalPosts([...minimalPosts, ...response.paginatedFeed]);
            setLoading(false);
        }
    };

    const refreshFeed = async () => {
        setIsFeedRefreshing(true);
        setMinimalPosts([]);
        if (authUser && token) {
            const apiEndpointURL = '/api/v1/feed?skip=0';
            const method = 'GET';
            const errorMessage = 'Unable to fetch feed!';

            const response = await backendFetch(
                token,
                setInfo,
                apiEndpointURL,
                method,
                errorMessage
            );

            setMinimalPosts([...response.paginatedFeed]);
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
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex min-h-[calc(100vh_-_3rem)] lg:min-h-full md:p-4 lg:w-full justify-center items-center shadow-lg bg-card dark:bg-cardDark"
        >
            <LoadingSpinner message="Getting feed" />
        </motion.div>
    );

    const HomeContent = (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center min-h-[calc(100vh_-_3rem)] lg:min-h-full lg:p-4 md:p-0 pb-4 bg-background2 dark:bg-background2Dark text-regularText dark:text-regularTextDark shadow-lg rounded lg:rounded-lg"
        >
            <h1 className="flex justify-center gap-2 text-xl font-bold sticky top-0 mb-4  px-4 w-fit rounded-full bg-gray-300/80 dark:bg-gray-500/80">
                Your feed
                <RefreshFeedButton refreshFeed={refreshFeed} />
            </h1>
            <Feed
                minimalPosts={minimalPosts}
                refreshFeed={refreshFeed}
                isFeedRefreshing={isFeedRefreshing}
            />
        </motion.div>
    );

    return loading ? LoadingContent : HomeContent;
}
