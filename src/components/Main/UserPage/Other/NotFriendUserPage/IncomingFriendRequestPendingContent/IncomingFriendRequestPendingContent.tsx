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

/**
 * React component for displaying content when there is an incoming friend request pending.
 *
 * @component
 * @param {IncomingFriendRequestPendingContentProps} props - The component props.
 * @param {OtherUserPageDataTypes} props.userPageData - Data of the user who sent the friend request.
 * @returns {JSX.Element} - JSX element representing the incoming friend request pending content.
 */
export default function IncomingFriendRequestPendingContent({
    userPageData,
}: IncomingFriendRequestPendingContentProps): JSX.Element {
    const { token } = useAuth();
    const { handleFetchUserData } = useCurrentUserData();
    const { handleFetchFriendData } = useFriendData();
    const { setInfo } = useInfoCard();

    const { _id, firstName, lastName } = userPageData || {};

    const otherUserId = _id;

    /**
     * Handles the acceptance of a friend request.
     *
     * @function
     * @return {void}
     */
    const handleAcceptFriendRequest = (): void => {
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

    /**
     * Handles declining a friend request.
     *
     * @function
     * @return {void}
     */
    const handleDeclineFriendRequest = (): void => {
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

    /**
     * JSX Element representing the user name section.
     *
     * @type {JSX.Element}
     */
    const UserNameSection: JSX.Element = (
        <>
            {firstName} {lastName} already sent you a friend request!
        </>
    );

    /**
     * JSX Element representing the accept button.
     *
     * @type {JSX.Element}
     */
    const AcceptButton: JSX.Element = (
        <motion.button
            onClick={handleAcceptFriendRequest}
            whileTap={{ scale: 0.97 }}
            className="bg-green-500 text-regularTextDark text-xs px-2 py-1 hover:bg-green-600 rounded"
        >
            Accept
        </motion.button>
    );

    /**
     * JSX Element representing the decline button.
     *
     * @type {JSX.Element}
     */
    const DeclineButton: JSX.Element = (
        <motion.button
            onClick={handleDeclineFriendRequest}
            whileTap={{ scale: 0.97 }}
            className="bg-red-500 text-regularTextDark text-xs px-2 py-1 hover:bg-red-600 rounded"
        >
            Decline
        </motion.button>
    );

    /**
     * The rendered IncomingFriendRequestPendingContent component.
     *
     * @type {JSX.Element}
     */
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
