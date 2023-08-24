import React from 'react';
import { MinimalUserTypes } from '../../../../types/minimalUserTypes';
import { getCorrectUserpicFormat } from '../../../../utilities/getCorrectUserpicFormat';

type ChatConversationListItemProps = {
    listItemData: MinimalUserTypes | null;
};

export default function ChatConversationListItem({
    listItemData,
}: ChatConversationListItemProps) {
    const { firstName, lastName, userpic } = listItemData || {};

    return (
        <div className="flex items-center w-full gap-4 p-2 text-regularText dark:text-regularTextDark bg-card dark:bg-cardDark hover:bg-cBlue dark:hover:bg-cBlue rounded-3xl">
            <img
                loading="lazy"
                className="w-8 h-8 object-cover rounded-full"
                src={`data:image/png;base64,${getCorrectUserpicFormat(
                    userpic
                )}`}
                alt="User avatar"
            />
            <div className="hidden md:block overflow-hidden whitespace-nowrap text-ellipsis">
                {firstName} {lastName}
            </div>
        </div>
    );
}
