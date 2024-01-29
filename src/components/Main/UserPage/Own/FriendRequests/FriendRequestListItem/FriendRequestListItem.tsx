import { useEffect, useRef, useState } from 'react';
import useAuth from '../../../../../../hooks/useAuth';
import { MinimalUserTypes } from '../../../../../../types/otherUserTypes';
import useInfoCard from '../../../../../../hooks/useInfoCard';
import LoadingSpinner from '../../../../../UiElements/LoadingSpinner/LoadingSpinner';
import useCurrentUserData from '../../../../../../hooks/useCurrentUserData';
import { useNavigate } from 'react-router-dom';
import useFriendData from '../../../../../../hooks/useFriendData';
import { backendFetch } from '../../../../../../utilities/backendFetch';
import { handleFriendRequest } from '../../../../../../utilities/handleFriendRequests';
import { motion } from 'framer-motion';

type FriendRequestListItemProps = {
    friendRequestUserId: string;
    handleFetchComplete: () => void;
};

/**
 * React component for rendering a friend request list item.
 *
 * @component
 * @param {FriendRequestListItemProps} props - The component props.
 * @param {string} props.friendRequestUserId - The user ID associated with the friend request.
 * @param {Function} props.handleFetchComplete - Callback function to handle fetch completion.
 * @returns {JSX.Element} The rendered FriendRequestListItem component.
 */
export default function FriendRequestListItem({
    friendRequestUserId,
    handleFetchComplete,
}: FriendRequestListItemProps): JSX.Element {
    const navigate = useNavigate();
    const { token } = useAuth();
    const { handleFetchUserData } = useCurrentUserData();
    const { handleFetchFriendData } = useFriendData();
    const { setInfo } = useInfoCard();
    const [loading, setLoading] = useState<boolean>(true);
    const [friendRequestData, setFriendRequestData] = useState<
        MinimalUserTypes | Record<string, never>
    >({});

    const { firstName, lastName } = friendRequestData || {};

    const shouldInitialize = useRef(true);

    const userPic = friendRequestData?.userpic?.data || '';

    /**
     * Handles the acceptance of a friend request.
     *
     * @function
     * @returns {void}
     */
    const handleAcceptFriendRequest = (): void => {
        if (token) {
            const otherUserId = friendRequestData._id;
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
     * Handles the decline of a friend request.
     *
     * @function
     * @returns {void}
     */
    const handleDeclineFriendRequest = (): void => {
        if (token) {
            const otherUserId = friendRequestData._id;
            const TYPE_OF_REQUEST = 'decline';

            handleFriendRequest(
                token,
                otherUserId,
                setInfo,
                TYPE_OF_REQUEST,
                handleFetchUserData,
                handleFetchFriendData
            );
        }
    };

    /**
     * Handles user click, navigating to the user's profile.
     *
     * @function
     * @returns {void}
     */
    const handleUserClick = (): void =>
        navigate(`/users/${friendRequestUserId}`);

    /**
     * useEffect hook to fetch user data when the component mounts.
     *
     * @effect
     * @returns {void}
     */
    useEffect(() => {
        const fetchUserData = async () => {
            if (token) {
                const apiEndpointURL = `/api/v1/users/${friendRequestUserId}`;
                const METHOD = 'GET';
                const ERROR_MESSAGE = 'Unable to fetch user data!';
                try {
                    const response = await backendFetch(
                        token,
                        setInfo,
                        apiEndpointURL,
                        METHOD,
                        ERROR_MESSAGE
                    );
                    setFriendRequestData(response?.user);
                    setLoading(false);

                    handleFetchComplete();
                } catch (error) {
                    setLoading(false);

                    handleFetchComplete();
                }
            }
        };

        if (shouldInitialize.current) fetchUserData();

        return () => {
            shouldInitialize.current = false;
        };
    }, []);

    /**
     * JSX Element representing the loading content.
     *
     * @type {JSX.Element}
     */
    const LoadingContent: JSX.Element = (
        <div className="flex justify-center items-center w-full py-4 ">
            <LoadingSpinner />
        </div>
    );

    /**
     * JSX Element representing the content for a friend request list item.
     *
     * @type {JSX.Element}
     */
    const FriendRequestListContent: JSX.Element = (
        <div className="flex flex-col gap-2">
            <div
                onClick={handleUserClick}
                className="flex items-center gap-2 cursor-pointer"
            >
                <img
                    className="w-6 md:w-8 h-auto object-cover rounded-full"
                    src={`data:image/png;base64,${userPic}`}
                    alt="User avatar"
                />
                <div className="break-all text-xs truncate">
                    {firstName} {lastName}
                </div>
            </div>
            <div className="flex items-center gap-4">
                <motion.button
                    onClick={handleAcceptFriendRequest}
                    whileTap={{ scale: 0.97 }}
                    className="bg-green-500 text-regularTextDark text-xs px-2 py-1 hover:bg-green-600 rounded"
                >
                    Accept
                </motion.button>
                <motion.button
                    onClick={handleDeclineFriendRequest}
                    whileTap={{ scale: 0.97 }}
                    className="bg-red-500 text-regularTextDark text-xs px-2 py-1 hover:bg-red-600 rounded"
                >
                    Decline
                </motion.button>
            </div>
        </div>
    );

    /**
     * Render the content based on the loading state.
     *
     * @type {JSX.Element}
     */
    return loading ? LoadingContent : FriendRequestListContent;
}
