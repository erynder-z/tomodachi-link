import React from 'react';
import UnfriendButton from '../UnfriendButton/UnfriendButton';

type FriendCoverSectionProps = {
    _id: string;
    firstName: string;
    lastName: string;
    userPicture: string;
    numberOfFriends: number;
    lastSeenFormatted: string;
    mutual_friends: number;
};

export default function FriendCoverSection({
    _id,
    firstName,
    lastName,
    userPicture,
    numberOfFriends,
    lastSeenFormatted,
    mutual_friends,
}: FriendCoverSectionProps) {
    return (
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
                        {numberOfFriends > 1 && 's'} • {mutual_friends} mutual
                        friend
                        {mutual_friends > 1 && 's'}
                    </p>
                </div>
                <div className="flex flex-col justify-between ml-auto ">
                    <div className="text-xs">
                        last seen: {lastSeenFormatted}
                    </div>
                    <UnfriendButton unfriendUserId={_id} />
                </div>
            </div>
        </div>
    );
}
