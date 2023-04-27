import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOtherUserData } from '../../../../utilities/fetchOtherUserData';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import { CurrentViewType } from '../../../../types/currentViewType';
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner';
import { OtherUserPageDataTypes } from '../../../../types/otherUserPageDataTypes';
import NotFriendUserPage from './NotFriendUserPage/NotFriendUserPage';
import FriendUserPage from './FriendUserPage/FriendUserPage';

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
            fetchOtherUserData(id, token, setInfo);
        }
    }, [id]);

    const fetchUserData = async () => {
        if (token) {
            const response = await fetchOtherUserData(
                id,
                token,

                setInfo
            );
            setUserPageData(response?.pageData);
            setIsFriend(response?.isFriend);
            setIsFriendRequestPending({
                incoming: response?.isIncomingFriendRequestPending,
                outgoing: response?.isOutgoingFriendRequestPending,
            });
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [id]);

    useEffect(() => {
        setCurrentView('OtherUserPage');
        localStorage.setItem('currentView', 'OtherUserPage');
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center w-full h-full py-4 bg-card ">
                <h1 className="font-bold">getting user data!</h1>
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
