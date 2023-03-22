import React from 'react';
import { UserDataType } from '../../../types/userDataType';

type Props = {
    userData: UserDataType | null;
};

export default function ProfileCard({ userData }: Props) {
    const { first_name, last_name, userpic, friends } = userData || {};
    const numberOfFriends = friends?.length;
    const base64String = btoa(
        String.fromCharCode(...new Uint8Array(userpic?.data?.data))
    );

    return (
        <div className="flex w-full">
            <div className="w-full text-center rounded-md shadow-lg p-4 bg-white">
                <img
                    className="w-20 h-20 object-cover rounded-full mx-auto shadow-lg"
                    src={`data:image/png;base64,${base64String}`}
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
