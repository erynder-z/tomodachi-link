import { useEffect, useRef, useState } from 'react';
import LoadingSpinner from '../../../UiElements/LoadingSpinner/LoadingSpinner';
import { motion } from 'framer-motion';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import PollItem from '../../Poll/PollItem/PollItem';
import { RetrievedPollDataType } from '../../../../types/pollTypes';
import { backendFetch } from '../../../../utilities/backendFetch';
import RefreshPollButton from './RefreshPollButton/RefreshPollButton';
import { FetchStatusType } from '../../../../types/miscTypes';
import { SearchModeType } from '../../../../types/searchTypes';
import SearchPollsButton from '../SearchPollsButton/SearchPollsButton';

type PollListProps = {
    isPaginationTriggered: boolean;
    setShouldOverlaysShow: React.Dispatch<
        React.SetStateAction<{
            searchOverlay: boolean;
            editUserDataModal: boolean;
            mobileOptionsModal: boolean;
            guestAccountOverlay: boolean;
        }>
    >;
    setSearchMode: React.Dispatch<React.SetStateAction<SearchModeType>>;
};

const USER_NOTIFICATION_TIMEOUT = 3000;
const USER_ERROR_NOTIFICATION_TIMEOUT = 15000;

/**
 * React component representing a list of polls.
 *
 * @component
 * @param {PollListProps} props - The props object.
 * @returns {JSX.Element} The rendered React element.
 */
export default function PollList({
    isPaginationTriggered,
    setShouldOverlaysShow,
    setSearchMode,
}: PollListProps): JSX.Element {
    const { token, authUser } = useAuth();
    const { setInfo } = useInfoCard();
    const [skip, setSkip] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [fetchStatus, setFetchStatus] = useState<FetchStatusType>('idle');
    const [polls, setPolls] = useState<RetrievedPollDataType[]>([]);

    const shouldInitialize = useRef(true);

    /**
     * Handles fetching polls from the backend and updating state accordingly.
     *
     * @async
     * @function
     * @returns {Promise<void>} A Promise that resolves when the poll fetching is complete.
     */
    const handleGetPolls = async (): Promise<void> => {
        const currentPolls = polls;
        if (authUser && token) {
            const API_ENDPOINT_URL = `/api/v1/poll/collection?skip=${skip}`;
            const METHOD = 'GET';
            const ERROR_MESSAGE = 'Unable to fetch polls!';

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
                setPolls([...polls, ...response.pollCollection]);
            } catch (error) {
                setPolls(currentPolls);
            } finally {
                clearTimeout(delayedNotificationTimeout);
                clearTimeout(errorNotificationTimeout);
                setFetchStatus('idle');
                setLoading(false);
            }
        }
    };

    /**
     * Refreshes the list of polls by fetching from the backend and updating state accordingly.
     *
     * @async
     * @function
     * @returns {Promise<void>} A Promise that resolves when the poll list is refreshed.
     */
    const refreshPoll = async (): Promise<void> => {
        const currentPolls = polls;
        setLoading(true);
        setPolls([]);
        if (authUser && token) {
            const API_ENDPOINT_URL = '/api/v1/poll/collection?skip=0';
            const METHOD = 'GET';
            const ERROR_MESSAGE = 'Unable to fetch polls!';

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
                setPolls([...polls, ...response.pollCollection]);
            } catch (error) {
                setPolls(currentPolls);
            } finally {
                clearTimeout(delayedNotificationTimeout);
                clearTimeout(errorNotificationTimeout);
                setFetchStatus('idle');
                setLoading(false);
            }
        }
    };

    /**
     * Effect to update the skip state when pagination is triggered.
     *
     * @effect
     * @return {void} No return value.
     */
    useEffect(() => {
        if (polls) setSkip(polls.length);
    }, [isPaginationTriggered]);

    /**
     * Effect to fetch polls when skip state is updated.
     *
     * @effect
     * @return {void} No return value.
     */
    useEffect(() => {
        if (token && skip) handleGetPolls();
    }, [skip]);

    /**
     * Effect to initialize the component and fetch polls on mount.
     *
     * @effect
     * @return {void} No return value.
     */
    useEffect(() => {
        if (shouldInitialize.current) handleGetPolls();

        return () => {
            shouldInitialize.current = false;
        };
    }, []);

    /**
     * JSX elements representing individual poll items based on the fetched data.
     *
     * @type {JSX.Element[]}
     */
    const HasPollContent: JSX.Element[] = polls.map((poll) => (
        <PollItem key={poll._id} pollData={poll} />
    ));

    /**
     * JSX element representing a message for an empty poll list.
     *
     * @type {JSX.Element}
     */
    const EmptyListContent: JSX.Element = (
        <span className="text-sm font-medium text-center">
            No polls yet! Why not create one?
        </span>
    );

    /**
     * Content for the loading state.
     *
     * @type {JSX.Element}
     */
    const LoadingContent: JSX.Element = (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex min-h-[calc(100vh_-_3rem)] lg:min-h-full md:p-4 lg:w-full justify-center items-center shadow-lg bg-card dark:bg-cardDark"
        >
            <LoadingSpinner
                message={
                    fetchStatus === 'delayed'
                        ? 'Your request is taking longer than normal'
                        : fetchStatus === 'error'
                        ? 'It should not take this long...Try refreshing the page!'
                        : 'Getting polls'
                }
            />
        </motion.div>
    );

    /**
     * Content for the PollList component when not in loading state.
     *
     * @type {JSX.Element}
     */
    const PollListContent: JSX.Element = (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center min-h-[calc(100vh_-_3rem)] lg:min-h-full p-0 md:p-4 pb-4 bg-background2 dark:bg-background2Dark text-regularText dark:text-regularTextDark shadow-lg rounded lg:rounded-lg "
        >
            <h1 className="flex justify-center gap-2 text-xl font-bold sticky z-50 top-0 md:top-4 md:mb-4 py-1 px-4 w-full md:w-fit md:rounded-full bg-background2 dark:bg-background2Dark md:bg-gray-300/80 md:dark:bg-gray-500/80">
                Poll list
                <RefreshPollButton refreshPoll={refreshPoll} />
                <SearchPollsButton
                    setShouldOverlaysShow={setShouldOverlaysShow}
                    setSearchMode={setSearchMode}
                />
            </h1>
            <div className="flex flex-col gap-4 pb-4 w-full">
                {polls.length > 0 ? HasPollContent : EmptyListContent}
            </div>
        </motion.div>
    );

    /**
     * Renders PollList Chat component depending on the loading state of the component.
     *
     * @return {JSX.Element} The rendered PollList component.
     */
    return loading ? LoadingContent : PollListContent;
}
