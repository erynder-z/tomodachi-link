import React from 'react';

type PostUserInfoSectionProps = {
    userPic: string;
    displayName: string;
};

export default function PostUserInfoSection({
    userPic,
    displayName,
}: PostUserInfoSectionProps) {
    return (
        <div className="flex gap-4">
            <img
                loading="lazy"
                className="w-8 h-8 object-cover rounded-full"
                src={`data:image/png;base64,${userPic}`}
                alt="User avatar"
            />
            <div className="font-bold">{displayName}</div>
        </div>
    );
}
