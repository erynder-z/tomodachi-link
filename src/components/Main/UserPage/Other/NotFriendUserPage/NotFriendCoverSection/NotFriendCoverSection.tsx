import React from 'react';

type NotFriendCoverSectionProps = {
    firstName: string;
    lastName: string;
    userPicture: string;
};

export default function NotFriendCoverSection({
    firstName,
    lastName,
    userPicture,
}: NotFriendCoverSectionProps) {
    return (
        <div className="h-96 col-span-5 grid grid-rows-4">
            <div className="row-span-3 flex h-full p-4 gap-4 bg-blue-300"></div>
            <div className="relative row-span-1 flex gap-4 p-4 bg-slate-300">
                <img
                    className="w-20 h-fit object-cover rounded-full relative bottom-10 border-white border-2"
                    src={`data:image/png;base64,${userPicture}`}
                    alt="User avatar"
                />
                <div className="flex flex-col">
                    <h1 className=" text-center font-bold h-auto">
                        {firstName} {lastName}'s page
                    </h1>
                </div>
            </div>
        </div>
    );
}
