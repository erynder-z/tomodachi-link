import React from 'react';
import { getCorrectUserpicFormat } from '../../../../utilities/getCorrectUserpicFormat';
import { TbLink } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import {
    CommonFriendType,
    FriendsOfFriendsType,
} from '../../../../types/friendsOfFriendsType';

type SuggestionCardProps = {
    friendData: FriendsOfFriendsType;
};

export default function SuggestionCard({ friendData }: SuggestionCardProps) {
    const { userpic, firstName, lastName, _id, commonFriends } = friendData;

    const commonFriendsList = commonFriends?.map(
        (commonFriendObject: CommonFriendType) => (
            <p key={commonFriendObject._id} className="text-xs break-all">
                {commonFriendObject.firstName} {commonFriendObject.lastName}
            </p>
        )
    );

    return (
        <div className="w-full lg:w-44 flex">
            <div className="w-full flex flex-col text-center p-4 bg-card shadow-lg">
                <section>
                    <img
                        className="w-20 h-20 object-cover rounded-full mx-auto"
                        src={`data:image/png;base64,${getCorrectUserpicFormat(
                            userpic
                        )}`}
                        alt="User avatar"
                    />
                    <p className="font-semibold text-md mt-5 break-all">
                        {firstName} {lastName}
                    </p>
                    {commonFriends && (
                        <>
                            <h1 className="font-semibold text-xs">
                                {`Common friend${
                                    commonFriends.length > 1 ? 's' : ''
                                }`}
                            </h1>
                            {commonFriendsList}
                        </>
                    )}
                </section>
                <div className="flex justify-around items-center">
                    <Link
                        to={`/users/${_id}`}
                        className="flex items-center w-max gap-4 py-2"
                    >
                        <TbLink className="text-xl" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
