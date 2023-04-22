import React from 'react';
import { UserPageDataTypes } from '../../../../../types/userPageDataTypes';
import { convertUserPic } from '../../../../../utilities/convertUserPic';
import PictureList from '../../SharedComponents/PictureList/PictureList';
import FriendList from '../../SharedComponents/FriendList/FriendList';
import UserPosts from '../UserPosts/UserPosts';

type Props = {
    userPageData: UserPageDataTypes | Record<string, never>;
};

export default function FriendUserPage({ userPageData }: Props) {
    const {
        firstName,
        lastName,
        username,
        userpic,
        friends,
        mutual_friends,
        joined,
        lastSeen,
    } = userPageData || {};

    const userPicture = convertUserPic(userpic);
    const numberOfFriends = friends.length;

    return (
        <div className="flex flex-col h-full lg:w-5/6 p-4 bg-card">
            <div className="grid grid-cols-5 grid-rows-4 h-full gap-4">
                <div className="flex col-span-5 p-4 gap-4 bg-amber-400">
                    <img
                        className=" w-auto h-full object-cover rounded-full"
                        src={`data:image/png;base64,${userPicture}`}
                        alt="User avatar"
                    />
                    <div className="flex flex-col">
                        <h1 className=" text-center font-bold h-auto">
                            {firstName} {lastName}'s page
                        </h1>
                        <p>
                            {numberOfFriends} friends • {mutual_friends} mutual
                            friends
                        </p>
                    </div>
                </div>
                <div className="col-span-2 flex flex-col h-1/2">
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
    );
}
