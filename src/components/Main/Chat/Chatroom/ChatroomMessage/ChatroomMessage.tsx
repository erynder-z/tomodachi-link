import React from 'react';
import { format } from 'date-fns';
import useCurrentUserData from '../../../../../hooks/useCurrentUserData';
import { DisplayChatMessageType } from '../../../../../types/displayChatMessageType';

type ChatroomMessageProps = {
    message: DisplayChatMessageType;
};

export default function ChatroomMessage({ message }: ChatroomMessageProps) {
    const { currentUserData } = useCurrentUserData();
    const { senderId, text, createdAt } = message;

    const isMessageFromCurrentUser = senderId === currentUserData?._id;

    const date = createdAt
        ? format(new Date(createdAt), 'HH:mm, dd.MMM.yyyy')
        : '';

    return (
        <div
            className={`flex flex-col w-fit max-w-1/2 bg-card dark:bg-cardDark text-regularText dark:text-regularTextDark rounded px-8 py-4 mb-2 ${
                isMessageFromCurrentUser ? 'mr-auto' : 'ml-auto'
            } ${
                isMessageFromCurrentUser
                    ? 'border-l-8 border-cCyan'
                    : 'border-r-8 border-cPink'
            }`}
        >
            <span className="text-xs">{date}</span>
            <span>{text}</span>
        </div>
    );
}
