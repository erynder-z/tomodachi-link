import React from 'react';
import { MinimalUserTypes } from '../../../../types/minimalUserTypes';
import { Link } from 'react-router-dom';

type Props = {
    listItemData: MinimalUserTypes;
};

export default function UserListItem({ listItemData }: Props) {
    const { _id, first_name, last_name, userpic } = listItemData || {};

    return (
        <Link
            to={`/users/${_id}`}
            className="flex items-center w-full gap-4 py-2"
        >
            <img
                className="w-8 h-8 object-cover rounded-full"
                src={`data:image/png;base64,${userpic.data}`}
                alt="User avatar"
            />
            {first_name} {last_name}
        </Link>
    );
}
