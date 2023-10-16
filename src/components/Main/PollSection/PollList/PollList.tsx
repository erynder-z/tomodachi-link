import { useEffect, useRef, useState } from 'react';
import LoadingSpinner from '../../../UiElements/LoadingSpinner/LoadingSpinner';
import { motion } from 'framer-motion';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import PollItem from '../../Poll/PollItem/PollItem';
import { RetrievedPollDataType } from '../../../../types/pollTypes';
import { backendFetch } from '../../../../utilities/backendFetch';

type PollListProps = {
    isPaginationTriggered: boolean;
};

export default function PollList({ isPaginationTriggered }: PollListProps) {
    const { token, authUser } = useAuth();
    const { setInfo } = useInfoCard();
    const [skip, setSkip] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [polls, setPolls] = useState<RetrievedPollDataType[]>([]);

    const shouldInitialize = useRef(true);

    const handleGetPolls = async () => {
        if (authUser && token) {
            const apiEndpointURL = `/api/v1/poll/collection?skip=${skip}`;
            const method = 'GET';
            const errorMessage = 'Unable to fetch polls!';
            const response = await backendFetch(
                token,
                setInfo,
                apiEndpointURL,
                method,
                errorMessage
            );
            setPolls([...polls, ...response.pollCollection]);
            setLoading(false);
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
            <LoadingSpinner message="Getting polls" />
        </motion.div>
    );

    const PollListContent = (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col just min-h-[calc(100vh_-_3rem)] lg:min-h-full p-0 md:p-4 pb-4 bg-background2 dark:bg-background2Dark text-regularText dark:text-regularTextDark shadow-lg rounded lg:rounded-lg"
        >
            <h1 className="text-center text-xl font-bold mb-4">Poll list</h1>
            <div className="flex flex-col gap-4 pb-4">
                {polls.length > 0 ? HasPollContent : EmptyListContent}
            </div>
        </motion.div>
    );

    return loading ? LoadingContent : PollListContent;
}
