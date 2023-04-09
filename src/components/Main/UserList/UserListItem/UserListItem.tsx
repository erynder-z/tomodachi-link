import React from 'react';
import { UserListUserType } from '../../../../types/userListTypes';

type Props = {
    listItemData: UserListUserType;
};

export default function UserListItem({ listItemData }: Props) {
    const { first_name, last_name, userpic } = listItemData || {};

    return (
        <div className="flex items-center w-full gap-4 py-2">
            <img
                className="w-8 h-8 object-cover rounded-full"
                src={`data:image/png;base64,${userpic.data}`}
                alt="User avatar"
            />
            {first_name} {last_name}
        </div>
    );
}
