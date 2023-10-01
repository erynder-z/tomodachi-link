import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { handleSendFriendRequest } from '../../../../../utilities/handleSendFriendRequest';
import useAuth from '../../../../../hooks/useAuth';
import useCurrentUserData from '../../../../../hooks/useCurrentUserData';
import useInfoCard from '../../../../../hooks/useInfoCard';
import { fetchOtherUserData } from '../../../../../utilities/fetchOtherUserData';
import { TbLink, TbUserPlus } from 'react-icons/tb';

type SuggestionCardFriendMenuProps = {
    id: string;
};

const SuggestionCardFriendMenu: React.FC<SuggestionCardFriendMenuProps> = ({
    id,
}: SuggestionCardFriendMenuProps) => {
    const { token } = useAuth();
    const { currentUserData } = useCurrentUserData();
    const { setInfo } = useInfoCard();
    const [isFriendRequestPending, setIsFriendRequestPending] = useState({
        incoming: false,
        outgoing: false,
    });
    const [disableFriendRequestButton, setDisableFriendRequestButton] =
        useState(false);
    const shouldFetchFriendData = useRef(true);

    const { _id: currentUserId } = currentUserData || {};
    const otherUserId = id;

    const fetchUserData = async () => {
        if (token) {
            const response = await fetchOtherUserData(id, token, setInfo);

            setIsFriendRequestPending({
                incoming: response?.isIncomingFriendRequestPending || false,
                outgoing: response?.isOutgoingFriendRequestPending || false,
            });
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

    const LinkToUser = (
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
    );

    const PendingFriendRequestContent = (
        <div className="flex justify-between items-center w-full text-left text-gray-400 group leading-tight">
            <span>Friend request pending</span>

            <TbUserPlus size="1.75em" />
        </div>
    );

    const CanSendFriendRequestContent = (
        <button
            onClick={() => {
                handleSendFriendRequest(
                    token,
                    currentUserId,
                    otherUserId,
                    setInfo,
                    setDisableFriendRequestButton
                );
            }}
            className="flex justify-between items-center w-full text-left text-regularText dark:text-regularTextDark group leading-tight"
        >
            <span className="group-hover:text-yellow-300 group-hover:dark:text-yellow-300 transition-all">
                Send friend request
            </span>
            <div className="group-hover:text-yellow-300 group-hover:dark:text-yellow-300 transition-all">
                <TbUserPlus />
            </div>
        </button>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-2 justify-around items-center"
        >
            {LinkToUser}
            {disableFriendRequestButton
                ? PendingFriendRequestContent
                : CanSendFriendRequestContent}
        </motion.div>
    );
};

export default SuggestionCardFriendMenu;
