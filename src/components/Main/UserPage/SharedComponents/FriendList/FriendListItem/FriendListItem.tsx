import React from 'react';
import { FriendDataType } from '../../../../../../types/friendDataType';
import { useNavigate } from 'react-router-dom';
import useCurrentUserData from '../../../../../../hooks/useCurrentUserData';

type FriendListItemProps = {
    friendData: FriendDataType;
};

export default function FriendListItem({ friendData }: FriendListItemProps) {
    const navigate = useNavigate();
    const { currentUserData } = useCurrentUserData();
    const { _id, firstName, lastName, userpic } = friendData ?? {};

    const handleUserClick = () => {
        if (!currentUserData) {
            return;
        }

        const path = currentUserData?._id === _id ? '/mypage' : `/users/${_id}`;
        navigate(path);
    };

    return (
        <div
            onClick={handleUserClick}
            className="w-20 flex flex-col gap-1 cursor-pointer"
        >
            <img
                className="w-20 h-20 aspect-square object-contain "
                src={`data:image/png;base64,${userpic.data}`}
                alt="User avatar"
            />

            <div className="text-xs p-1 break-all">
                {firstName} {lastName}
            </div>
        </div>
    );
}
