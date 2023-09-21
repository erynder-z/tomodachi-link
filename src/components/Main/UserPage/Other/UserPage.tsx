import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOtherUserData } from '../../../../utilities/fetchOtherUserData';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import LoadingSpinner from '../../../UiElements/LoadingSpinner/LoadingSpinner';
import { OtherUserPageDataTypes } from '../../../../types/otherUserPageDataTypes';
import NotFriendUserPage from './NotFriendUserPage/NotFriendUserPage';
import FriendUserPage from './FriendUserPage/FriendUserPage';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';

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

    useEffect(() => {
        if (token) {
            setLoading(true);
            fetchOtherUserData(id, token, setInfo);
        }
    }, [id]);

    const fetchUserData = async () => {
        if (token) {
            const response = await fetchOtherUserData(id, token, setInfo);
            setUserPageData(response?.pageData ?? {});
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
