import { useEffect, useRef, useState } from 'react';
import LoadingSpinner from '../../UiElements/LoadingSpinner/LoadingSpinner';
import Feed from './Feed/Feed';
import { motion } from 'framer-motion';
import RefreshFeedButton from './RefreshFeedButton/RefreshFeedButton';
import { backendFetch } from '../../../utilities/backendFetch';
import useAuth from '../../../hooks/useAuth';
import useInfoCard from '../../../hooks/useInfoCard';
import { MinimalPostType } from '../../../types/postTypes';
import { FetchStatusType } from '../../../types/miscTypes';
import SearchPostsButton from './SearchPostsButton/SearchPostsButton';
import { SearchModeType } from '../../../types/searchTypes';

type FeedSectionProps = {
    isPaginationTriggered: boolean;
    setShouldOverlaysShow: React.Dispatch<
        React.SetStateAction<{
            searchOverlay: boolean;
            editUserDataModal: boolean;
            mobileOptionsModal: boolean;
            guestAccountOverlay: boolean;
            introOverlay: boolean;
        }>
    >;
    setSearchMode: React.Dispatch<React.SetStateAction<SearchModeType>>;
};

const USER_NOTIFICATION_TIMEOUT = 3000;
const USER_ERROR_NOTIFICATION_TIMEOUT = 15000;

/**
 * FeedSection component to display the user's feed.
 *
 * @component
 * @param {FeedSectionProps} props - The props object.
 * @param {boolean} props.isPaginationTriggered - Indicates if pagination is triggered.
 * @param {React.Dispatch<React.SetStateAction<{
 *   searchOverlay: boolean;
 *   editUserDataModal: boolean;
 *   mobileOptionsModal: boolean;
 *   guestAccountOverlay: boolean;
 * }>>} props.setShouldOverlaysShow - Function to set overlay states.
 * @param {React.Dispatch<React.SetStateAction<SearchModeType>>} props.setSearchMode - Function to set search mode.
 * @returns {JSX.Element} The rendered FeedSection component.
 */
export default function FeedSection({
    isPaginationTriggered,
    setShouldOverlaysShow,
    setSearchMode,
}: FeedSectionProps): JSX.Element {
    const { token, authUser } = useAuth();
    const { setInfo } = useInfoCard();
    const [loading, setLoading] = useState<boolean>(true);
    const [fetchStatus, setFetchStatus] = useState<FetchStatusType>('idle');
    const [minimalPosts, setMinimalPosts] = useState<MinimalPostType[]>([]);
    const [skip, setSkip] = useState<number | null>(null);
    const [isFeedRefreshing, setIsFeedRefreshing] = useState<boolean>(false);

    const shouldInitialize = useRef(true);

    /**
     * Handles the retrieval of the user's feed.
     *
     * @async
     * @function
     * @returns {Promise<void>} A Promise that resolves when the feed is retrieved.
     */
    const handleGetFeed = async (): Promise<void> => {
        const currentFeed = minimalPosts;
        if (authUser && token) {
            const API_ENDPOINT_URL = `/api/v1/feed?skip=${skip}`;
            const METHOD = 'GET';
            const ERROR_MESSAGE = 'Unable to fetch feed!';

            setFetchStatus('fetching');

            const delayedNotificationTimeout = setTimeout(() => {
                setFetchStatus('delayed');
            }, USER_NOTIFICATION_TIMEOUT);

            const errorNotificationTimeout = setTimeout(() => {
                setFetchStatus('error');
            }, USER_ERROR_NOTIFICATION_TIMEOUT);

            try {
                const response = await backendFetch(
                    token,
                    setInfo,
                    API_ENDPOINT_URL,
                    METHOD,
                    ERROR_MESSAGE
                );

                setMinimalPosts([...minimalPosts, ...response.paginatedFeed]);
            } catch {
                setMinimalPosts(currentFeed);
            } finally {
                clearTimeout(delayedNotificationTimeout);
                clearTimeout(errorNotificationTimeout);
                setFetchStatus('idle');
                setLoading(false);
            }
        }
    };

    /**
     * Refreshes the user's feed.
     *
     * @async
     * @function
     * @returns {Promise<void>} A Promise that resolves when the feed is refreshed.
     */
    const refreshFeed = async (): Promise<void> => {
        const currentFeed = minimalPosts;
        setIsFeedRefreshing(true);
        setMinimalPosts([]);
        if (authUser && token) {
            const API_ENDPOINT_URL = '/api/v1/feed?skip=0';
            const METHOD = 'GET';
            const ERROR_MESSAGE = 'Unable to fetch feed!';

            setFetchStatus('fetching');

            const delayedNotificationTimeout = setTimeout(() => {
                setFetchStatus('delayed');
            }, USER_NOTIFICATION_TIMEOUT);

            const errorNotificationTimeout = setTimeout(() => {
                setFetchStatus('error');
            }, USER_ERROR_NOTIFICATION_TIMEOUT);

            try {
                const response = await backendFetch(
                    token,
                    setInfo,
                    API_ENDPOINT_URL,
                    METHOD,
                    ERROR_MESSAGE
                );
                setMinimalPosts([...response.paginatedFeed]);
            } catch (error) {
                setMinimalPosts(currentFeed);
            } finally {
                clearTimeout(delayedNotificationTimeout);
                clearTimeout(errorNotificationTimeout);
                setFetchStatus('idle');
                setLoading(false);
                setIsFeedRefreshing(false);
            }
        }
    };

    /**
     * useEffect hook to set the skip value when pagination is triggered.
     *
     * @effect
     * @return {void} No return value.
     */
    useEffect(() => {
        if (minimalPosts) setSkip(minimalPosts.length);
    }, [isPaginationTriggered]);

    /**
     * useEffect hook to handle the initial fetch of the user's feed.
     * Fetches the user's feed based on the skip value.
     * Sets loading state, fetch status, and minimal posts.
     *
     * @effect
     * @return {void} No return value.
     */
    useEffect(() => {
        if (token && skip) handleGetFeed();
    }, [skip]);

    /**
     * useEffect hook to handle the initial fetch of the user's feed on component mount.
     * Fetches the user's feed and sets loading state, fetch status, and minimal posts.
     * Initializes the shouldInitialize ref to prevent repeated fetching on updates.
     *
     * @effect
     * @return {void} No return value.
     */
    useEffect(() => {
        if (shouldInitialize.current) handleGetFeed();

        return () => {
            shouldInitialize.current = false;
        };
    }, []);

    /**
     * Content to display while loading.
     *
     * @type {JSX.Element}
     */
    const LoadingContent: JSX.Element = (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex min-h-[calc(100vh_-_3rem)] lg:min-h-full md:p-4 lg:w-full justify-center items-center shadow-lg bg-background2 dark:bg-background2Dark"
        >
            <LoadingSpinner
                message={
                    fetchStatus === 'delayed'
                        ? 'Your request is taking longer than normal'
                        : fetchStatus === 'error'
                        ? 'It should not take this long...Try refreshing the page!'
                        : 'Getting feed'
                }
            />
        </motion.div>
    );

    /**
     * Content for the rendered feed section.
     *
     * @type {JSX.Element}
     */
    const HomeContent: JSX.Element = (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center min-h-[calc(100vh_-_3rem)] lg:min-h-full lg:p-4 md:p-0 pb-4 bg-background2 dark:bg-background2Dark text-regularText dark:text-regularTextDark shadow-lg rounded lg:rounded-lg"
        >
            <h1 className="flex justify-center gap-2 text-xl font-bold sticky z-50 top-0 md:top-4 md:mb-4 py-1 px-4 w-full md:w-fit md:rounded-full bg-background2 dark:bg-background2Dark md:bg-gray-300/80 md:dark:bg-gray-500/80">
                Your feed
                <RefreshFeedButton refreshFeed={refreshFeed} />
                <SearchPostsButton
                    setShouldOverlaysShow={setShouldOverlaysShow}
                    setSearchMode={setSearchMode}
                />
            </h1>

            <Feed
                minimalPosts={minimalPosts}
                refreshFeed={refreshFeed}
                isFeedRefreshing={isFeedRefreshing}
                fetchStatus={fetchStatus}
            />
        </motion.div>
    );

    /**
     * Renders the FeedSection based on the loading state.
     *
     * @return {JSX.Element} The rendered FeedSection component.
     */
    return loading ? LoadingContent : HomeContent;
}
