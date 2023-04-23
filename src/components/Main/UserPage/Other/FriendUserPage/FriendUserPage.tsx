import React from 'react';
import { UserPageDataTypes } from '../../../../../types/userPageDataTypes';
import { convertUserPic } from '../../../../../utilities/convertUserPic';
import PictureList from '../../SharedComponents/PictureList/PictureList';
import FriendList from '../../SharedComponents/FriendList/FriendList';
import UserPosts from '../UserPosts/UserPosts';
import { formatDistanceToNow } from 'date-fns';

type Props = {
    userPageData: UserPageDataTypes | Record<string, never>;
};

export default function FriendUserPage({ userPageData }: Props) {
    const { firstName, lastName, userpic, friends, mutual_friends, lastSeen } =
        userPageData || {};

    const userPicture = convertUserPic(userpic);
    const numberOfFriends = friends.length;
    const lastSeenFormatted = lastSeen
        ? `${formatDistanceToNow(new Date(lastSeen), { addSuffix: true })} `
        : '';

    return (
        <div className="flex flex-col lg:w-11/12 p-4 bg-card">
            <div className="md:grid grid-cols-5 h-full gap-4">
                <div className="h-96 col-span-5 grid grid-rows-4">
                    <div className="row-span-3 flex h-full p-4 gap-4 bg-blue-300"></div>
                    <div className="relative row-span-1 flex flex-col md:flex-row gap-4 p-4 bg-slate-300">
                        <img
                            className="absolute md:relative w-20 h-fit object-cover rounded-full bottom-20 md:bottom-10 border-white border-2"
                            src={`data:image/png;base64,${userPicture}`}
                            alt="User avatar"
                        />

                        <div className="flex flex-col">
                            <h1 className=" text-center font-bold h-auto">
                                {firstName} {lastName}'s page
                            </h1>
                            <p className="text-center text-xs">
                                {numberOfFriends} friend
                                {numberOfFriends > 1 && 's'} • {mutual_friends}{' '}
                                mutual friend
                                {mutual_friends > 1 && 's'}
                            </p>
                        </div>

                        <div className="ml-auto text-xs">
                            last seen: {lastSeenFormatted}
                        </div>
                    </div>
                </div>
                <div className="col-span-5 flex flex-col md:grid grid-cols-5">
                    <div className="col-span-2 flex flex-col h-1/2 ov">
                        <div className="flex h-1/4 md:h-auto md:p-4">
                            <PictureList />
                        </div>
                        <div className="flex h-1/4 md:h-auto md:p-4">
                            <FriendList friendData={friends} />
                        </div>
                    </div>
                    <div className="col-span-3 flex flex-col gap-4 md:px-4 overflow-auto">
                        <UserPosts />
                    </div>
                </div>
            </div>
        </div>
    );
}
