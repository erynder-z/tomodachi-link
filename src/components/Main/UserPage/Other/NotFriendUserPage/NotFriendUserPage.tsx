import React, { useState } from 'react';
import { OtherUserPageDataTypes } from '../../../../../types/otherUserPageDataTypes';
import useCurrentUserData from '../../../../../hooks/useCurrentUserData';
import { sendFriendRequest } from '../../../../../utilities/sendFriendRequest';
import useAuth from '../../../../../hooks/useAuth';
import useInfoCard from '../../../../../hooks/useInfoCard';
import { convertUserPic } from '../../../../../utilities/convertUserPic';

type NotFriendUserPageProps = {
    userPageData: OtherUserPageDataTypes | Record<string, never>;
    isFriendRequestPending: {
        incoming: boolean;
        outgoing: boolean;
    };
};

export default function NotFriendUserPage({
    userPageData,
    isFriendRequestPending,
}: NotFriendUserPageProps) {
    const { token } = useAuth();
    const { currentUserData } = useCurrentUserData();
    const { setInfo } = useInfoCard();
    const [disableButton, setDisableButton] = useState<boolean>(
        isFriendRequestPending.outgoing
    );
    const { firstName, lastName, userpic } = userPageData || {};
    const userPicture = convertUserPic(userpic);

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
            <div className="grid grid-cols-5  h-full gap-4">
                <div className="h-96 col-span-5 grid grid-rows-4">
                    <div className="row-span-3 flex h-full p-4 gap-4 bg-blue-300"></div>
                    <div className="relative row-span-1 flex gap-4 p-4 bg-slate-300">
                        <img
                            className="w-20 h-fit object-cover rounded-full relative bottom-10 border-white border-2"
                            src={`data:image/png;base64,${userPicture}`}
                            alt="User avatar"
                        />

                        <div className="flex flex-col">
                            <h1 className=" text-center font-bold h-auto">
                                {firstName} {lastName}'s page
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="col-span-5 flex flex-col justify-center items-center gap-4">
                    <h2 className="font-bold">
                        Become friends with {firstName} {lastName} to view more!
                    </h2>
                    {getButton()}
                </div>
            </div>
        </div>
    );
}
