import React from 'react';
import useCurrentUserData from '../../../hooks/useCurrentUserData';
import { convertImageToBase64 } from '../../../utilities/convertImageToBase64';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

export default function ProfileCard() {
    const { currentUserData } = useCurrentUserData();
    const { firstName, lastName, userpic, friends } = currentUserData || {};
    const numberOfFriends = friends?.length;
    const userImage = userpic ? convertImageToBase64(userpic) : undefined;

    if (!userImage) {
        return (
            <div className="flex flex-col gap-4 h-44 md:p-4 lg:w-full lg:justify-around shadow-lg bg-card">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="flex w-full">
            <div className="w-full text-center p-4 bg-card">
                <img
                    className="w-20 h-20 object-cover rounded-full mx-auto shadow-lg"
                    src={`data:image/png;base64,${userImage}`}
                    alt="User avatar"
                />
                <p className="font-semibold text-xl my-5 break-all">
                    {firstName} {lastName}
                </p>
                <p className="text-sm mb-2">{numberOfFriends} Friends</p>
            </div>
        </div>
    );
}
