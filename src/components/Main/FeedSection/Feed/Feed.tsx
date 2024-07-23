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

/**
 * Feed component to display the user's feed.
 *
 * @component
 * @param {FreedProps} props - The props object.
 * @param {MinimalPostType[]} props.minimalPosts - The array of minimal post data.
 * @param {() => Promise<void>} props.refreshFeed - Function to refresh the user's feed.
 * @param {boolean} props.isFeedRefreshing - Indicates if the feed is currently refreshing.
 * @param {FetchStatusType} props.fetchStatus - The fetch status of the feed.
 * @returns {JSX.Element} The rendered Feed component.
 */
export default function Feed({
    minimalPosts,
    refreshFeed,
    isFeedRefreshing,
    fetchStatus,
}: FreedProps): JSX.Element {
    /**
     * Loading content to be displayed while fetching the feed.
     *
     * @constant
     * @type {JSX.Element}
     */
    const LoadingContent: JSX.Element = (
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

    /**
     * Feed content to be displayed when the feed is loaded.
     *
     * @constant
     * @type {JSX.Element}
     */
    const FeedContent: JSX.Element = (
        <div className="flex flex-col md:grid grid-cols-[25%,75%] gap-4 justify-center min-h-[calc(100vh_-_18rem)] bg-background2 dark:bg-background2Dark text-regularText dark:text-regularTextDark">
            <ShowPeopleInThisFeed minimalPosts={minimalPosts} />
            <div className="flex flex-col gap-4 pb-4">
                <NewPostInput handleRefreshPosts={refreshFeed} />
                <FeedPostList posts={minimalPosts} onPostChange={refreshFeed} />
            </div>
        </div>
    );

    /**
     * The main Feed component.
     *
     * @returns {JSX.Element} The rendered Feed component.
     */
    return (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className=" h-1/4 md:h-auto w-full gap-8 "
        >
            {isFeedRefreshing ? LoadingContent : FeedContent}
        </motion.div>
    );
}
