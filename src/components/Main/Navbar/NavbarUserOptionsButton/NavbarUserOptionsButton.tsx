import React from 'react';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';
import { convertImageToBase64 } from '../../../../utilities/convertImageToBase64';

export default function NavbarUserOptionsButton() {
    const { currentUserData } = useCurrentUserData();
    const { userpic, pendingFriendRequests } = currentUserData || {};
    const userImage = convertImageToBase64(userpic);

    const numberOfPendingFriendRequests = pendingFriendRequests?.length;

    return (
        <div className="relative">
            <img
                className="w-8 h-8 object-cover rounded-full mx-auto shadow-lg"
                src={`data:image/png;base64,${userImage}`}
                alt="User avatar"
            />
            {numberOfPendingFriendRequests ? (
                <div className="absolute top-5 left-5 flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-white text-xs pointer-events-none"></div>
            ) : null}
        </div>
    );
}
