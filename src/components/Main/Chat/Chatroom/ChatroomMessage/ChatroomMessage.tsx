import React from 'react';

type ChatroomMessageProps = {
    message: string;
};

export default function ChatroomMessage({ message }: ChatroomMessageProps) {
    return <div className="w-fit bg-card px-4 py-2 mb-2">{message}</div>;
}
