import React from 'react';
import { CommentType } from '../../../../../../types/commentType';
import { formatDistanceToNow } from 'date-fns';

type Props = {
    commentDetails: CommentType;
};

export default function CommentItem({ commentDetails }: Props) {
    const { owner, timestamp, text } = commentDetails;
    const { username, userpic } = owner;

    const userPic = userpic?.data?.data
        ? btoa(String.fromCharCode(...new Uint8Array(userpic.data.data)))
        : '';

    const time = timestamp
        ? `${formatDistanceToNow(new Date(timestamp), { addSuffix: true })} ago`
        : '';

    return (
        <div className="flex gap-4">
            <img
                className="w-6 h-6 object-cover rounded-full shadow-lg"
                src={`data:image/png;base64,${userPic}`}
                alt="User avatar"
            />
            <div className="relative flex flex-col bg-gray-200 rounded-md py-2 px-4">
                <div className="text-xs">
                    <span className="text-sm font-bold">{username}</span> (
                    {time})
                </div>
                <div className="text-sm">{text}</div>
                <div className="absolute top-1/2 left-0 transform -translate-x-full -translate-y-1/2 w-0 h-0 border-l-8 border-transparent border-solid border-l-gray-200"></div>
            </div>
        </div>
    );
}
