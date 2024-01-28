import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import LoadingSpinner from '../../../UiElements/LoadingSpinner/LoadingSpinner';
import { OtherUserPageDataTypes } from '../../../../types/otherUserTypes';
import NotFriendUserPage from './NotFriendUserPage/NotFriendUserPage';
import FriendUserPage from './FriendUserPage/FriendUserPage';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';
import { backendFetch } from '../../../../utilities/backendFetch';

type UserPageProps = {
    isPaginationTriggered: boolean;
};

/**
 * React component for rendering the user page.
 *
 * @component
 * @param {UserPageProps} props - The component props.
 * @param {boolean} props.isPaginationTriggered - Indicates whether pagination is triggered.
 * @returns {JSX.Element} The rendered UserPage component.
 */
export default function UserPage({
    isPaginationTriggered,
}: UserPageProps): JSX.Element {
    const params = useParams();
    const id: string | undefined = params.id;
    const { token } = useAuth();
    const { currentUserData } = useCurrentUserData();
    const { setInfo } = useInfoCard();
    const [userPageData, setUserPageData] = useState<
        OtherUserPageDataTypes | Record<string, never>
    >({});
    const [isFriend, setIsFriend] = useState<boolean>(false);
    const [isFriendRequestPending, setIsFriendRequestPending] = useState<{
        incoming: boolean;
        outgoing: boolean;
    }>({
        incoming: false,
        outgoing: false,
    });
    const [loading, setLoading] = useState<boolean>(true);

    const shouldFetchUserData = useRef(true);

    /**
     * useEffect hook to fetch (other)user data when the component mounts and when the current user accepts a friend request.
     *
     * @effect
     * @returns {void}
     */
    useEffect(() => {
        const fetchUserData = async () => {
            if (token) {
                const apiEndpointURL = `/api/v1/users/${id}`;
                const METHOD = 'GET';
                const ERROR_MESSAGE = 'Unable to fetch posts!';

                const response = await backendFetch(
                    token,
                    setInfo,
                    apiEndpointURL,
                    METHOD,
                    ERROR_MESSAGE
                );

                setUserPageData(response?.user ?? {});
                setIsFriend(response?.isFriend ?? false);
                setIsFriendRequestPending({
                    incoming: response?.isIncomingFriendRequestPending ?? false,
                    outgoing: response?.isOutgoingFriendRequestPending ?? false,
                });
                setLoading(false);
            }
        };

        if (shouldFetchUserData.current) fetchUserData();

        return () => {
            shouldFetchUserData.current = false;
        };
    }, [id, currentUserData?.pendingFriendRequests]);

    /**
     * JSX Element representing the loading content.
     *
     * @type {JSX.Element}
     */
    const LoadingContent: JSX.Element = (
        <div className="flex flex-col justify-center items-center w-full h-full py-4 bg-background2 dark:bg-background2Dark">
            <LoadingSpinner message="Getting user data" />
        </div>
    );

    /**
     * JSX Element representing the content for a non-friend user.
     *
     * @type {JSX.Element}
     */
    const NorFriendContent: JSX.Element = (
        <NotFriendUserPage
            userPageData={userPageData}
            isFriendRequestPending={isFriendRequestPending}
        />
    );

    /**
     * JSX Element representing the content for a friend user.
     *
     * @type {JSX.Element}
     */
    const FriendContent: JSX.Element = (
        <FriendUserPage
            userPageData={userPageData}
            isPaginationTriggered={isPaginationTriggered}
        />
    );

    /**
     * Render the content based on the loading state.
     *
     * @type {JSX.Element}
     */
    return loading
        ? LoadingContent
        : isFriend
        ? FriendContent
        : NorFriendContent;
}
