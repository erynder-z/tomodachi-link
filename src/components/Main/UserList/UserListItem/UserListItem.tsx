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
            className="flex items-center w-max gap-4 py-2"
        >
            <img
                loading="lazy"
                className="w-8 h-8 object-cover rounded-full"
                src={`data:image/png;base64,${getCorrectUserpicFormat(
                    userpic
                )}`}
                alt="User avatar"
            />
            {firstName} {lastName}
        </Link>
    );
}
