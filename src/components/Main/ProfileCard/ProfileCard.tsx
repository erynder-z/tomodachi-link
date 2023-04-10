import React from 'react';
import useUserData from '../../../hooks/useUserData';

export default function ProfileCard() {
    const { userData } = useUserData();
    const { first_name, last_name, userpic, friends } = userData || {};
    const numberOfFriends = friends?.length;
    const base64StringUserPic = window.btoa(
        String.fromCharCode(...new Uint8Array(userpic?.data?.data))
    );

    return (
        <div className="flex w-full">
            <div className="w-full text-center rounded-md shadow-lg p-4 bg-card">
                <img
                    className="w-20 h-20 object-cover rounded-full mx-auto shadow-lg"
                    src={`data:image/png;base64,${base64StringUserPic}`}
                    alt="User avatar"
                />
                <p className="font-semibold text-sm my-5 break-all">
                    {first_name} {last_name}
                </p>
                <p className="text-sm mb-2">{numberOfFriends} Friends</p>
            </div>
        </div>
    );
}
