import { OtherUserPageDataTypes } from '../../../../../../types/otherUserTypes';
import useAuth from '../../../../../../hooks/useAuth';
import useCurrentUserData from '../../../../../../hooks/useCurrentUserData';
import useFriendData from '../../../../../../hooks/useFriendData';
import useInfoCard from '../../../../../../hooks/useInfoCard';
import { motion } from 'framer-motion';
import { handleFriendRequest } from '../../../../../../utilities/handleFriendRequests';

type IncomingFriendRequestPendingContentProps = {
    userPageData: OtherUserPageDataTypes | Record<string, never>;
};

export default function IncomingFriendRequestPendingContent({
    userPageData,
}: IncomingFriendRequestPendingContentProps) {
    const { token } = useAuth();
    const { handleFetchUserData } = useCurrentUserData();
    const { handleFetchFriendData } = useFriendData();
    const { setInfo } = useInfoCard();

    const { _id, firstName, lastName } = userPageData || {};

    const otherUserId = _id;

    const handleAcceptFriendRequest = () => {
        if (token) {
            const typeOfRequest = 'accept';
            handleFriendRequest(
                token,
                otherUserId,
                setInfo,
                typeOfRequest,
                handleFetchUserData,
                handleFetchFriendData
            );
        }
    };

    const handleDeclineFriendRequest = () => {
        if (token) {
            const typeOfRequest = 'decline';
            handleFriendRequest(
                token,
                otherUserId,
                setInfo,
                typeOfRequest,
                handleFetchUserData,
                handleFetchFriendData
            );
        }
    };

    const UserNameSection = (
        <>
            {firstName} {lastName} already sent you a friend request!
        </>
    );

    const AcceptButton = (
        <motion.button
            onClick={handleAcceptFriendRequest}
            whileTap={{ scale: 0.97 }}
            className="bg-green-500 text-regularTextDark text-xs px-2 py-1 hover:bg-green-600"
        >
            Accept
        </motion.button>
    );

    const DeclineButton = (
        <motion.button
            onClick={handleDeclineFriendRequest}
            whileTap={{ scale: 0.97 }}
            className="bg-red-500 text-regularTextDark text-xs px-2 py-1 hover:bg-red-600"
        >
            Decline
        </motion.button>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4 p-4 text-center"
        >
            {UserNameSection}
            <div className="col-span-5 place-content-center flex items-center gap-4">
                {AcceptButton}
                {DeclineButton}
            </div>
        </motion.div>
    );
}
