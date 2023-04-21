import React from 'react';
import { FriendDataType } from '../../../../../types/friendDataType';
import { useNavigate } from 'react-router-dom';

type Props = {
    friendData: FriendDataType;
};

export default function FriendListItem({ friendData }: Props) {
    const navigate = useNavigate();
    const { _id, firstName, lastName, userpic } = friendData || {};

    const handleUserClick = () => {
        navigate(`/users/${_id}`);
    };

    return (
        <div
            onClick={handleUserClick}
            className="flex flex-col justify-between gap-1 cursor-pointer"
        >
            <img
                className="w-24 h-24 object-contain rounded-md"
                src={`data:image/png;base64,${userpic.data}`}
                alt="User avatar"
            />

            <div className="text-xs p-1">
                {firstName} {lastName}
            </div>
        </div>
    );
}
