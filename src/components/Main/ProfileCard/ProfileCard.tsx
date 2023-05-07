import React from 'react';
import useCurrentUserData from '../../../hooks/useCurrentUserData';
import { convertImageToBase64 } from '../../../utilities/convertImageToBase64';

export default function ProfileCard() {
    const { currentUserData } = useCurrentUserData();
    const { firstName, lastName, userpic, friends } = currentUserData || {};
    const numberOfFriends = friends?.length;
    const userImage = convertImageToBase64(userpic);

    return (
        <div className="flex w-full">
            <div className="w-full text-center shadow-lg p-4 bg-card">
                <img
                    className="w-20 h-20 object-cover rounded-full mx-auto shadow-lg"
                    src={`data:image/png;base64,${userImage}`}
                    alt="User avatar"
                />
                <p className="font-semibold text-sm my-5 break-all">
                    {firstName} {lastName}
                </p>
                <p className="text-sm mb-2">{numberOfFriends} Friends</p>
            </div>
        </div>
    );
}
