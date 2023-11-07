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

type PollListProps = {
    isPaginationTriggered: boolean;
};

const USER_NOTIFICATION_TIMEOUT = 3000;
const USER_ERROR_NOTIFICATION_TIMEOUT = 15000;

export default function PollList({ isPaginationTriggered }: PollListProps) {
    const { token, authUser } = useAuth();
    const { setInfo } = useInfoCard();
    const [skip, setSkip] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [fetchStatus, setFetchStatus] = useState<FetchStatusType>('idle');
    const [polls, setPolls] = useState<RetrievedPollDataType[]>([]);

    const shouldInitialize = useRef(true);

    const handleGetPolls = async () => {
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

    const refreshPoll = async () => {
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

    useEffect(() => {
        if (polls) setSkip(polls.length);
    }, [isPaginationTriggered]);

    useEffect(() => {
        if (token && skip) handleGetPolls();
    }, [skip]);

    useEffect(() => {
        if (shouldInitialize.current) handleGetPolls();

        return () => {
            shouldInitialize.current = false;
        };
    }, []);

    const HasPollContent = polls.map((poll) => (
        <PollItem key={poll._id} pollData={poll} />
    ));

    const EmptyListContent = (
        <span className="text-sm font-medium text-center">
            No polls yet! Why not create one?
        </span>
    );

    const LoadingContent = (
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

    const PollListContent = (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center min-h-[calc(100vh_-_3rem)] lg:min-h-full p-0 md:p-4 pb-4 bg-background2 dark:bg-background2Dark text-regularText dark:text-regularTextDark shadow-lg rounded lg:rounded-lg"
        >
            <h1 className="flex justify-center gap-2 text-xl font-bold sticky top-0 mb-4  px-4 w-fit rounded-full bg-gray-300/80 dark:bg-gray-500/80">
                Poll list
                <RefreshPollButton refreshPoll={refreshPoll} />
            </h1>
            <div className="flex flex-col gap-4 pb-4 w-full">
                {polls.length > 0 ? HasPollContent : EmptyListContent}
            </div>
        </motion.div>
    );

    return loading ? LoadingContent : PollListContent;
}
