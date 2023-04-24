import React from 'react';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';
import { convertUserPic } from '../../../../utilities/convertUserPic';

export default function NavbarUserOptionsButton() {
    const { currentUserData } = useCurrentUserData();
    const { userpic, pending_friend_requests } = currentUserData || {};
    const userImage = convertUserPic(userpic);

    const pendingFriendRequests = pending_friend_requests?.length;

    return (
        <div className="relative">
            <img
                className="w-8 h-8 object-cover rounded-full mx-auto shadow-lg"
                src={`data:image/png;base64,${userImage}`}
                alt="User avatar"
            />
            {pendingFriendRequests ? (
                <div className="absolute top-5 left-5 flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-white text-xs pointer-events-none"></div>
            ) : null}
        </div>
    );
}
