import ShowPeopleInThisFeed from '../ShowPeopleInThisFeed/ShowPeopleInThisFeed';
import { MinimalPostType } from '../../../../types/postTypes';
import NewPostInput from '../../Post/NewPostInput/NewPostInput';
import FeedPostList from './FeedPostList/FeedPostList';
import { motion } from 'framer-motion';
import LoadingSpinner from '../../../UiElements/LoadingSpinner/LoadingSpinner';

type FreedProps = {
    minimalPosts: MinimalPostType[];
    refreshFeed: () => Promise<void>;
    isFeedRefreshing: boolean;
};

export default function Feed({
    minimalPosts,
    refreshFeed,
    isFeedRefreshing,
}: FreedProps) {
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
        <div className="flex flex-col md:grid grid-cols-[1fr,2fr] gap-8 justify-center min-h-[calc(100vh_-_18rem)] bg-background2 dark:bg-background2Dark text-regularText dark:text-regularTextDark">
            <ShowPeopleInThisFeed minimalPosts={minimalPosts} />
            <div className="flex flex-col gap-4 pb-4">
                <FeedPostList posts={minimalPosts} onPostChange={refreshFeed} />
            </div>
        </div>
    );

    return (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col h-1/4 md:h-auto w-full gap-8 "
        >
            <NewPostInput handleRefreshPosts={refreshFeed} />
            {isFeedRefreshing ? LoadingContent : FeedContent}
        </motion.div>
    );
}
