import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOtherUserData } from '../../../../utilities/fetchOtherUserData';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import { CurrentViewType } from '../../../../types/currentViewType';
import LoadingSpinner from '../../../UiElements/LoadingSpinner/LoadingSpinner';
import { OtherUserPageDataTypes } from '../../../../types/otherUserPageDataTypes';
import NotFriendUserPage from './NotFriendUserPage/NotFriendUserPage';
import FriendUserPage from './FriendUserPage/FriendUserPage';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';

type UserPageProps = {
    setCurrentView: React.Dispatch<React.SetStateAction<CurrentViewType>>;
    isPaginationTriggered: boolean;
};

export default function UserPage({
    setCurrentView,
    isPaginationTriggered,
}: UserPageProps) {
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

    const shouldSetCurrentView = useRef(true);

    useEffect(() => {
        if (token) {
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

    useEffect(() => {
        if (shouldSetCurrentView.current === true) {
            setCurrentView('OtherUserPage');
            localStorage.setItem('currentViewOdinBook', 'OtherUserPage');
        }
        return () => {
            shouldSetCurrentView.current = false;
        };
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center w-full h-full py-4 bg-card dark:bg-cardDark">
                <LoadingSpinner />
            </div>
        );
    }

    if (!isFriend) {
        return (
            <NotFriendUserPage
                userPageData={userPageData}
                isFriendRequestPending={isFriendRequestPending}
            />
        );
    }

    return (
        <FriendUserPage
            userPageData={userPageData}
            isPaginationTriggered={isPaginationTriggered}
        />
    );
}
