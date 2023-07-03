import { format } from 'date-fns';
import React from 'react';
import { ChatMessageType } from '../../../../../types/chatMessageType';

type ChatroomMessageProps = {
    message: ChatMessageType;
};

export default function ChatroomMessage({ message }: ChatroomMessageProps) {
    const date = message
        ? format(message?.timestamp, 'HH:mm, dd.MMM.yyyy')
        : '';

    return (
        <div className="flex flex-col w-fit bg-card px-4 py-2 mb-2">
            <span className="text-xs">{date}</span>
            <span>{message?.text}</span>
        </div>
    );
}
