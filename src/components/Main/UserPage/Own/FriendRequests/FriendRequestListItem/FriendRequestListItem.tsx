import React, { useEffect, useState } from 'react';
import useAuth from '../../../../../../hooks/useAuth';
import { MinimalUserTypes } from '../../../../../../types/minimalUserTypes';
import { fetchMinimalUserData } from '../../../../../../utilities/fetchMinimalUserData';
import useInfoCard from '../../../../../../hooks/useInfoCard';
import LoadingSpinner from '../../../../../LoadingSpinner/LoadingSpinner';
import useCurrentUserData from '../../../../../../hooks/useCurrentUserData';
import { acceptFriendRequest } from '../../../../../../utilities/acceptFriendRequest';
import { declineFriendRequest } from '../../../../../../utilities/declineFriendRequest';
import { useNavigate } from 'react-router-dom';
import { convertDatabaseImageToBase64 } from '../../../../../../utilities/convertDatabaseImageToBase64';
import useFriendData from '../../../../../../hooks/useFriendData';

type FriendRequestListItemProps = {
    friendRequestUserId: string;
};

export default function FriendRequestListItem({
    friendRequestUserId,
}: FriendRequestListItemProps) {
    const navigate = useNavigate();
    const { token } = useAuth();
    const { currentUserData, handleFetchUserData } = useCurrentUserData();
    const { handleFetchFriendData } = useFriendData();
    const { setInfo } = useInfoCard();
    const [loading, setLoading] = useState<boolean>(true);
    const [friendRequestData, setFriendRequestData] = useState<
        MinimalUserTypes | Record<string, never>
    >({});

    const { firstName, lastName } = friendRequestData || {};

    const userPic =
        convertDatabaseImageToBase64(friendRequestData?.userpic) || '';

    const handleAcceptFriendRequest = () => {
        if (currentUserData && token) {
            const currentUserId = currentUserData?._id;
            const otherUserId = friendRequestData._id;

            acceptFriendRequest(
                token,
                currentUserId,
                otherUserId,
                handleFetchUserData,
                handleFetchFriendData,
                setInfo
            );
        }
    };

    const handleDeclineFriendRequest = () => {
        if (currentUserData && token) {
            const currentUserId = currentUserData?._id;
            const otherUserId = friendRequestData._id;

            declineFriendRequest(
                token,
                currentUserId,
                otherUserId,
                handleFetchUserData,
                handleFetchFriendData,
                setInfo
            );
        }
    };

    const handleUserClick = () => {
        navigate(`/users/${friendRequestUserId}`);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            if (token) {
                const response = await fetchMinimalUserData(
                    token,
                    friendRequestUserId,
                    setInfo
                );
                setFriendRequestData(response);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center w-full py-4 ">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <div
                onClick={handleUserClick}
                className="flex items-center gap-2 cursor-pointer"
            >
                <img
                    className="w-7 h-7 aspect-square object-cover rounded-full"
                    src={`data:image/png;base64,${userPic}`}
                    alt="User avatar"
                />
                <div className="break-all">
                    {firstName} {lastName}
                </div>
            </div>
            <div className="flex items-center gap-4">
                <button
                    onClick={handleAcceptFriendRequest}
                    className="bg-green-500 text-white text-xs px-2 py-1 hover:bg-green-600"
                >
                    Accept
                </button>
                <button
                    onClick={handleDeclineFriendRequest}
                    className="bg-red-500 text-white text-xs px-2 py-1 hover:bg-red-600"
                >
                    Decline
                </button>
            </div>
        </div>
    );
}
