import React from 'react';
import { CommentType } from '../../../../../../types/commentType';
import { formatDistanceToNow } from 'date-fns';
import { convertImageToBase64 } from '../../../../../../utilities/convertImageToBase64';

type CommentItemProps = {
    commentDetails: CommentType;
};

export default function CommentItem({ commentDetails }: CommentItemProps) {
    const { owner, timestamp, text } = commentDetails;
    const { firstName, lastName, userpic } = owner;

    const displayName = `${firstName} ${lastName}`;
    const userPic = convertImageToBase64(userpic);

    const time = timestamp
        ? `${formatDistanceToNow(new Date(timestamp), { addSuffix: true })}`
        : '';

    return (
        <div className="flex gap-4">
            <img
                loading="lazy"
                className="w-6 h-6 object-cover rounded-full shadow-lg"
                src={`data:image/png;base64,${userPic}`}
                alt="User avatar"
            />
            <div className="relative flex flex-col bg-gray-200 py-2 px-4">
                <div className="text-xs">
                    <span className="text-sm font-bold">{displayName}</span> (
                    {time})
                </div>
                <div className="text-sm">{text}</div>
                <div className="absolute top-1/2 left-0 transform -translate-x-full -translate-y-1/2 w-0 h-0 border-l-8 border-transparent border-solid border-l-gray-200"></div>
            </div>
        </div>
    );
}
