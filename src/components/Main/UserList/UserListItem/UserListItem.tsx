import React from 'react';
import { MinimalUserTypes } from '../../../../types/minimalUserTypes';
import { Link } from 'react-router-dom';
import { getCorrectUserpicFormat } from '../../../../utilities/getCorrectUserpicFormat';

type UserListItemProps = {
    listItemData: MinimalUserTypes;
};

export default function UserListItem({ listItemData }: UserListItemProps) {
    const { _id, firstName, lastName, userpic } = listItemData || {};

    return (
        <Link
            to={`/users/${_id}`}
            className="flex items-center w-full gap-4 py-2 text-regularText dark:text-regularTextDark hover:text-highlight dark:hover:text-highlightDark rounded lg:rounded-lg"
        >
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
        </Link>
    );
}
