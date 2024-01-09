import ShowPeopleInThisFeed from '../ShowPeopleInThisFeed/ShowPeopleInThisFeed';
import { MinimalPostType } from '../../../../types/postTypes';
import NewPostInput from '../../Post/NewPostInput/NewPostInput';
import FeedPostList from './FeedPostList/FeedPostList';
import { motion } from 'framer-motion';
import LoadingSpinner from '../../../UiElements/LoadingSpinner/LoadingSpinner';
import { FetchStatusType } from '../../../../types/miscTypes';

type FreedProps = {
    minimalPosts: MinimalPostType[];
    refreshFeed: () => Promise<void>;
    isFeedRefreshing: boolean;
    fetchStatus: FetchStatusType;
};

export default function Feed({
    minimalPosts,
    refreshFeed,
    isFeedRefreshing,
    fetchStatus,
}: FreedProps) {
    const LoadingContent = (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col md:col-span-2 justify-center items-center w-full h-full py-4 gap-4 text-regularText dark:text-regularTextDark "
        >
            <LoadingSpinner
                message={
                    fetchStatus === 'delayed'
                        ? 'Your request is taking longer than normal'
                        : 'Getting feed'
                }
            />
        </motion.div>
    );

    const FeedContent = (
        <div className="flex flex-col md:grid grid-cols-[2fr,5fr] gap-4 justify-center min-h-[calc(100vh_-_18rem)] bg-background2 dark:bg-background2Dark text-regularText dark:text-regularTextDark">
            <ShowPeopleInThisFeed minimalPosts={minimalPosts} />
            <div className="flex flex-col gap-4 pb-4 z-10">
                <NewPostInput handleRefreshPosts={refreshFeed} />
                <FeedPostList posts={minimalPosts} onPostChange={refreshFeed} />
            </div>
        </div>
    );

    return (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className=" h-1/4 md:h-auto w-full gap-8 "
        >
            {/*   <NewPostInput handleRefreshPosts={refreshFeed} /> */}
            {isFeedRefreshing ? LoadingContent : FeedContent}
        </motion.div>
    );
}
