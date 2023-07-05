import React from 'react';
import { MinimalUserTypes } from '../../../../../types/minimalUserTypes';
import { Link } from 'react-router-dom';
import { getCorrectUserpicFormat } from '../../../../../utilities/getCorrectUserpicFormat';

type ChatUserListItemProps = {
    listItemData: MinimalUserTypes;
};

export default function ChatUserListItem({
    listItemData,
}: ChatUserListItemProps) {
    const { _id, firstName, lastName, userpic } = listItemData || {};

    return (
        <div className="flex items-center w-full gap-4 py-2 text-regularText ">
            <img
                loading="lazy"
                className="w-8 h-8 object-cover rounded-full"
                src={`data:image/png;base64,${getCorrectUserpicFormat(
                    userpic
                )}`}
                alt="User avatar"
            />
            <div className="overflow-hidden whitespace-nowrap text-ellipsis">
                {firstName} {lastName}
            </div>
            <Link
                to={`/users/${_id}/chat`}
                className="flex items-center justify-center md:justify-start gap-2 w-fit md:w-fit  bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 mt-4 ml-auto text-sm"
            >
                chat
            </Link>
        </div>
    );
}
