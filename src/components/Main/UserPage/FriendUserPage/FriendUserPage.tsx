import React from 'react';
import { UserPageDataTypes } from '../../../../types/userPageDataTypes';
import UserPictures from '../UserPictures/UserPictures';
import UserFriends from '../UserFriends/UserFriends';
import UserPosts from '../UserPosts/UserPosts';

type Props = {
    userPageData: UserPageDataTypes | Record<string, never>;
};

export default function FriendUserPage({ userPageData }: Props) {
    const { first_name, last_name, userpic } = userPageData || {};
    const base64StringUserPic = window.btoa(
        String.fromCharCode(...new Uint8Array(userpic?.data?.data))
    );
    return (
        <div className="flex flex-col h-full w-5/6 p-4 bg-card">
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
                <div className="col-span-1 flex flex-col h-1/2">
                    <div className="flex h-1/4 md:h-auto md:p-4">
                        <UserPictures />
                    </div>
                    <div className="flex h-1/4 md:h-auto md:p-4">
                        <UserFriends />
                    </div>
                </div>
                <div className="col-span-2 flex flex-col gap-4 md:px-4 overflow-auto">
                    <UserPosts />
                </div>
            </div>
        </div>
    );
}
