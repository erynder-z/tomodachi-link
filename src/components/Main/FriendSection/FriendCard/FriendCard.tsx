import React from 'react';
import { MinimalUserTypes } from '../../../../types/minimalUserTypes';
import { getCorrectUserpicFormat } from '../../../../utilities/getCorrectUserpicFormat';
import { TbLink, TbMessages, TbUserMinus } from 'react-icons/tb';
import { Link } from 'react-router-dom';

type FriendCardProps = {
    friendData: MinimalUserTypes;
};

export default function FriendCard({ friendData }: FriendCardProps) {
    const { userpic, firstName, lastName, _id } = friendData;

    return (
        <div className="w-full lg:w-44 h-60">
            <div className="w-full text-center p-4 bg-card shadow-lg">
                <img
                    className="w-20 h-20 object-cover rounded-full mx-auto shadow-lg"
                    src={`data:image/png;base64,${getCorrectUserpicFormat(
                        userpic
                    )}`}
                    alt="User avatar"
                />
                <p className="font-semibold text-md my-5 break-all">
                    {firstName} {lastName}
                </p>
                <div className="flex justify-around items-center">
                    <Link
                        to={`/users/${_id}`}
                        className="flex items-center w-max gap-4 py-2"
                    >
                        <TbLink size="1.5em" />
                    </Link>
                    <TbMessages size="1.5em" /> <TbUserMinus size="1.5em" />
                </div>
            </div>
        </div>
    );
}
