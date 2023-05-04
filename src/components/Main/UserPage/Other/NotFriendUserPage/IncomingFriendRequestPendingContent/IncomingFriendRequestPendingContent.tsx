import React from 'react';
import { OtherUserPageDataTypes } from '../../../../../../types/otherUserPageDataTypes';
import useAuth from '../../../../../../hooks/useAuth';
import useCurrentUserData from '../../../../../../hooks/useCurrentUserData';
import useFriendData from '../../../../../../hooks/useFriendData';
import useInfoCard from '../../../../../../hooks/useInfoCard';
import { acceptFriendRequest } from '../../../../../../utilities/acceptFriendRequest';
import { declineFriendRequest } from '../../../../../../utilities/declineFriendRequest';

type IncomingFriendRequestPendingContentProps = {
    userPageData: OtherUserPageDataTypes | Record<string, never>;
};

export default function IncomingFriendRequestPendingContent({
    userPageData,
}: IncomingFriendRequestPendingContentProps) {
    const { token } = useAuth();
    const { currentUserData, handleFetchUserData } = useCurrentUserData();
    const { handleFetchFriendData } = useFriendData();
    const { setInfo } = useInfoCard();

    const { _id, firstName, lastName } = userPageData || {};

    const currentUserId = currentUserData?._id;
    const otherUserId = _id;

    const handleAcceptFriendRequest = () => {
        if (currentUserId && token) {
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
        if (currentUserId && token) {
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

    return (
        <div className="flex flex-col gap-4 p-4 text-center">
            {firstName} {lastName} already sent you a friend request!
            <div className="col-span-5 place-content-center flex items-center gap-4">
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
