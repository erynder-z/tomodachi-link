import { useEffect, useState } from 'react';
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

export default function UserPage({ isPaginationTriggered }: UserPageProps) {
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

    useEffect(() => {
        fetchUserData();
    }, [id, currentUserData?.pendingFriendRequests]);

    const LoadingContent = (
        <div className="flex flex-col justify-center items-center w-full h-full py-4 bg-background2 dark:bg-background2Dark">
            <LoadingSpinner message="Getting user data" />
        </div>
    );

    const NorFriendContent = (
        <NotFriendUserPage
            userPageData={userPageData}
            isFriendRequestPending={isFriendRequestPending}
        />
    );

    const FriendContent = (
        <FriendUserPage
            userPageData={userPageData}
            isPaginationTriggered={isPaginationTriggered}
        />
    );

    return loading
        ? LoadingContent
        : isFriend
        ? FriendContent
        : NorFriendContent;
}
