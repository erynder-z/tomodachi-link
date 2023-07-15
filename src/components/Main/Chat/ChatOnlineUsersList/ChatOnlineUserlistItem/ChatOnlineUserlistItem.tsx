import React from 'react';
import { MinimalUserTypes } from '../../../../../types/minimalUserTypes';
import { getCorrectUserpicFormat } from '../../../../../utilities/getCorrectUserpicFormat';

type ChatOnlineUserlistItemProps = {
    listItemData: MinimalUserTypes;
    isOnline: boolean;
};

export default function ChatOnlineUserlistItem({
    listItemData,
    isOnline,
}: ChatOnlineUserlistItemProps) {
    const { firstName, lastName, userpic } = listItemData || {};
    const indicatorColor = isOnline ? 'green' : 'gray';

    return (
        <div className="flex items-center w-full gap-4 py-2 text-regularText ">
            <div
                className={`w-3 h-3 rounded-full bg-${indicatorColor}-500`}
            ></div>
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
        </div>
    );
}
