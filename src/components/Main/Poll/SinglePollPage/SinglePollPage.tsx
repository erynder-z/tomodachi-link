import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { MdOutlineArrowBack } from 'react-icons/md';
import PollItem from '../PollItem/PollItem';
import { RetrievedPollDataType } from '../../../../types/pollTypes';
import LoadingSpinner from '../../../UiElements/LoadingSpinner/LoadingSpinner';
import { backendFetch } from '../../../../utilities/backendFetch';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';

export default function SinglePollPage() {
    const { token } = useAuth();
    const { setInfo } = useInfoCard();

    const [loading, setLoading] = useState<boolean>(true);
    const [pollData, setPollData] = useState<RetrievedPollDataType | null>(
        null
    );

    const navigate = useNavigate();
    const { id } = useParams();

    const shouldGetPollData = useRef(true);

    const getPostDetails = async (pollID: string) => {
        if (token) {
            const API_ENDPOINT_URL = `/api/v1/poll/${pollID}/single`;
            const METHOD = 'GET';
            const ERROR_MESSAGE = 'Unable to fetch poll!';
            const response = await backendFetch(
                token,
                setInfo,
                API_ENDPOINT_URL,
                METHOD,
                ERROR_MESSAGE
            );

            setPollData(response?.singlePoll);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            if (shouldGetPollData.current) getPostDetails(id);

            return () => {
                shouldGetPollData.current = false;
            };
        }
    }, []);

    const LoadingContent = (
        <div className="flex flex-col gap-4 h-[400px] md:p-4 lg:w-full lg:justify-around shadow-lg bg-card dark:bg-cardDark">
            <LoadingSpinner message="Getting poll data" />
        </div>
    );

    const SinglePollPageContent = (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-4 p-4 min-h-[calc(100vh_-_2rem)] w-full bg-background2 dark:bg-background2Dark rounded text-regularText dark:text-regularTextDark"
        >
            <MdOutlineArrowBack
                onClick={() => navigate(-1)}
                size="1.5em"
                className="cursor-pointer hover:text-highlight dark:hover:text-highlightDark hover:animate-squish duration-300"
            />
            <h1 className="text-center text-xl font-bold mb-4">
                Search result
            </h1>
            <div className="">
                {pollData ? (
                    <PollItem pollData={pollData} />
                ) : loading ? (
                    <LoadingSpinner message="Getting poll data" />
                ) : (
                    <div className="font-roboto flex flex-col gap-4 p-4 lg:w-full lg:justify-around shadow-lg bg-card dark:bg-cardDark rounded lg:rounded-lg text-center">
                        Could not load poll
                    </div>
                )}
            </div>
        </motion.div>
    );

    return loading ? LoadingContent : SinglePollPageContent;
}
