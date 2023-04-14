import React, { useState } from 'react';
import { UserPageDataTypes } from '../../../../types/userPageDataTypes';
import useUserData from '../../../../hooks/useUserData';
import { sendFriendRequest } from '../../../../utilities/sendFriendRequest';
import useAuth from '../../../../hooks/useAuth';
import useInfoOverlay from '../../../../hooks/useInfoOverlay';

type Props = {
    userPageData: UserPageDataTypes | Record<string, never>;
    isFriendRequestPending: boolean;
};

export default function NotFriendUserPage({
    userPageData,
    isFriendRequestPending,
}: Props) {
    const { token } = useAuth();
    const { userData } = useUserData();
    const { setInfo } = useInfoOverlay();
    const [disableButton, setDisableButton] = useState<boolean>(
        isFriendRequestPending
    );
    const { first_name, last_name, userpic } = userPageData || {};
    const base64StringUserPic = window.btoa(
        String.fromCharCode(...new Uint8Array(userpic?.data?.data))
    );

    const handleSendFriendRequest = () => {
        if (userData && token) {
            const currentUserId = userData?._id;
            const requestUserId = userPageData._id;

            sendFriendRequest(token, currentUserId, requestUserId, setInfo);
            setDisableButton(true);
        }
    };

    const getButton = () => {
        if (disableButton) {
            return (
                <button
                    disabled
                    className="bg-gray-500 text-white rounded-md px-2 py-1"
                >
                    Friend request pending
                </button>
            );
        } else {
            return (
                <button
                    onClick={handleSendFriendRequest}
                    className="bg-blue-500 text-white rounded-md px-2 py-1 hover:bg-blue-600"
                >
                    Send friend request
                </button>
            );
        }
    };

    return (
        <div className="flex flex-col h-full lg:w-5/6 p-4 bg-card">
            <div
                className="md:grid grid-cols-3 h-full gap-4"
                style={{ gridTemplateRows: '15% auto' }}
            >
                <img
                    className="col-span-1 w-20 h-20 object-cover rounded-full mx-auto"
                    src={`data:image/png;base64,${base64StringUserPic}`}
                    alt="User avatar"
                />
                <h1 className="col-span-2 text-center font-bold h-auto">
                    {first_name} {last_name}'s page
                </h1>
                <div className="col-span-3 flex flex-col justify-center items-center gap-4">
                    <h2 className="font-bold">
                        Become friends with {first_name} {last_name} to view
                        more!
                    </h2>
                    {getButton()}
                </div>
            </div>
        </div>
    );
}
