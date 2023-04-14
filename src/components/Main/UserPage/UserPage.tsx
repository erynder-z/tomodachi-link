import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOtherUserData } from '../../../utilities/fetchOtherUserData';
import useAuth from '../../../hooks/useAuth';
import useInfoOverlay from '../../../hooks/useInfoOverlay';
import { CurrentViewType } from '../../../types/currentViewType';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import { UserPageDataTypes } from '../../../types/userPageDataTypes';
import NotFriendUserPage from './NotFriendUserPage/NotFriendUserPage';
import FriendUserPage from './FriendUserPage/FriendUserPage';

type setCurrentView = {
    setCurrentView: React.Dispatch<React.SetStateAction<CurrentViewType>>;
};

export default function UserPage({ setCurrentView }: setCurrentView) {
    const params = useParams();
    const id: string | undefined = params.id;
    const { token } = useAuth();
    const { setInfo } = useInfoOverlay();

    const [userPageData, setUserPageData] = useState<
        UserPageDataTypes | Record<string, never>
    >({});
    const [isFriend, setIsFriend] = useState<boolean>(false);
    const [isFriendRequestPending, setIsFriendRequestPending] =
        useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (token) {
            fetchOtherUserData(id, token, setInfo);
        }
    }, [id]);

    useEffect(() => {
        const fetchUserData = async () => {
            if (token) {
                const response = await fetchOtherUserData(
                    id,
                    token,

                    setInfo
                );
                setUserPageData(response?.pageData);
                setIsFriend(response?.isFriend);
                setIsFriendRequestPending(response?.isFriendRequestPending);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

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

    return <FriendUserPage userPageData={userPageData} />;
}
