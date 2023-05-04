import React, { useState } from 'react';
import useAuth from '../../../../../../hooks/useAuth';
import useCurrentUserData from '../../../../../../hooks/useCurrentUserData';
import useInfoCard from '../../../../../../hooks/useInfoCard';
import { sendFriendRequest } from '../../../../../../utilities/sendFriendRequest';
import { OtherUserPageDataTypes } from '../../../../../../types/otherUserPageDataTypes';

type NormalContentProps = {
    userPageData: OtherUserPageDataTypes | Record<string, never>;
    isFriendRequestPending: {
        incoming: boolean;
        outgoing: boolean;
    };
};

export default function NormalContent({
    userPageData,
    isFriendRequestPending,
}: NormalContentProps) {
    const { token } = useAuth();
    const { currentUserData } = useCurrentUserData();
    const { setInfo } = useInfoCard();
    const [disableButton, setDisableButton] = useState<boolean>(
        isFriendRequestPending.outgoing
    );
    const { firstName, lastName } = userPageData || {};

    const handleSendFriendRequest = () => {
        if (currentUserData && token) {
            const currentUserId = currentUserData?._id;
            const otherUserId = userPageData._id;

            sendFriendRequest(token, currentUserId, otherUserId, setInfo);
            setDisableButton(true);
        }
    };

    const getButton = () => {
        if (disableButton) {
            return (
                <button disabled className="bg-gray-500 text-white px-2 py-1">
                    Friend request pending
                </button>
            );
        } else {
            return (
                <button
                    onClick={handleSendFriendRequest}
                    className="bg-blue-500 text-white px-2 py-1 hover:bg-blue-600"
                >
                    Send friend request
                </button>
            );
        }
    };
    return (
        <div className="flex flex-col justify-center items-center gap-4 p-4">
            <h2 className="font-bold">
                Become friends with {firstName} {lastName} to view more!
            </h2>
            {getButton()}
        </div>
    );
}
