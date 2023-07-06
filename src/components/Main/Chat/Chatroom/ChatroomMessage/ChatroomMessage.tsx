import React from 'react';
import { format } from 'date-fns';
import { ChatMessageType } from '../../../../../types/chatMessageType';
import useCurrentUserData from '../../../../../hooks/useCurrentUserData';

type ChatroomMessageProps = {
    message: ChatMessageType;
};

export default function ChatroomMessage({ message }: ChatroomMessageProps) {
    const { currentUserData } = useCurrentUserData();
    const { senderId, text, timestamp } = message;

    const isMessageFromCurrentUser = senderId === currentUserData?._id;

    const date = timestamp ? format(timestamp, 'HH:mm, dd.MMM.yyyy') : '';

    return (
        <div
            className={`flex flex-col w-fit max-w-1/2 bg-card px-8 py-4 mb-2 ${
                isMessageFromCurrentUser ? 'mr-auto' : 'ml-auto'
            } ${
                isMessageFromCurrentUser
                    ? 'border-l-8 border-cBlue'
                    : 'border-r-8 border-cRed'
            }`}
        >
            <span className="text-xs">{date}</span>
            <span>{text}</span>
        </div>
    );
}
