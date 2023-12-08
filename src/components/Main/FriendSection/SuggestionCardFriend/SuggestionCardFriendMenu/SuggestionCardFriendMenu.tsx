import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuth from '../../../../../hooks/useAuth';
import useInfoCard from '../../../../../hooks/useInfoCard';
import { TbLink, TbUserPlus } from 'react-icons/tb';
import { backendFetch } from '../../../../../utilities/backendFetch';
import { handleFriendRequest } from '../../../../../utilities/handleFriendRequests';
import LoadingSpinner from '../../../../UiElements/LoadingSpinner/LoadingSpinner';

type SuggestionCardFriendMenuProps = {
    id: string;
};

const SuggestionCardFriendMenu: React.FC<SuggestionCardFriendMenuProps> = ({
    id,
}: SuggestionCardFriendMenuProps) => {
    const { token } = useAuth();
    const { setInfo } = useInfoCard();
    const [isFriendRequestPending, setIsFriendRequestPending] = useState({
        incoming: false,
        outgoing: false,
    });
    const [disableFriendRequestButton, setDisableFriendRequestButton] =
        useState(false);
    const [loading, setLoading] = useState(true);
    const shouldFetchFriendData = useRef(true);

    const otherUserId = id;

    const fetchUserData = async () => {
        if (token) {
            const API_ENDPOINT_URL = `/api/v1/users/${id}`;
            const METHOD = 'GET';
            const ERROR_MESSAGE = 'Unable to fetch user data!';

            try {
                const response = await backendFetch(
                    token,
                    setInfo,
                    API_ENDPOINT_URL,
                    METHOD,
                    ERROR_MESSAGE
                );

                setIsFriendRequestPending({
                    incoming: response?.isIncomingFriendRequestPending || false,
                    outgoing: response?.isOutgoingFriendRequestPending || false,
                });

                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        if (shouldFetchFriendData.current) fetchUserData();

        return () => {
            shouldFetchFriendData.current = false;
        };
    }, []);

    useEffect(() => {
        setDisableFriendRequestButton(
            isFriendRequestPending.outgoing || isFriendRequestPending.incoming
        );
    }, [isFriendRequestPending]);

    const LoadingContent = (
        <div className="flex justify-center items-center w-full h-full py-4 ">
            <LoadingSpinner message="Checking status" />
        </div>
    );

    const LinkToUser = (
        <motion.button whileTap={{ scale: 0.97 }} className="w-full">
            <Link
                to={`/users/${id}`}
                className="flex justify-between items-center w-full text-left text-regularText dark:text-regularTextDark group"
            >
                <span className="group-hover:text-yellow-300 group-hover:dark:text-yellow-300 transition-all">
                    Visit page
                </span>
                <div className="group-hover:text-yellow-300 group-hover:dark:text-yellow-300 transition-all">
                    <TbLink />
                </div>
            </Link>
        </motion.button>
    );

    const PendingFriendRequestContent = (
        <div className="flex justify-between items-center w-full text-left text-gray-400 group leading-tight">
            <span>Friend request pending</span>

            <TbUserPlus size="1.75em" />
        </div>
    );

    const CanSendFriendRequestContent = (
        <motion.button
            onClick={() => {
                if (token) {
                    const typeOfRequest = 'send';
                    setDisableFriendRequestButton(true);
                    handleFriendRequest(
                        token,
                        otherUserId,
                        setInfo,
                        typeOfRequest
                    );
                }
            }}
            whileTap={{ scale: 0.97 }}
            className="flex justify-between items-center w-full text-left text-regularText dark:text-regularTextDark group leading-tight"
        >
            <span className="group-hover:text-yellow-300 group-hover:dark:text-yellow-300 transition-all">
                Send friend request
            </span>
            <div className="group-hover:text-yellow-300 group-hover:dark:text-yellow-300 transition-all">
                <TbUserPlus />
            </div>
        </motion.button>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-2 justify-around items-center"
        >
            {LinkToUser}
            {loading
                ? LoadingContent
                : disableFriendRequestButton
                ? PendingFriendRequestContent
                : CanSendFriendRequestContent}
        </motion.div>
    );
};

export default SuggestionCardFriendMenu;
