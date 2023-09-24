import React from 'react';

type PollUserInfoSectionProps = {
    userPic: string;
    displayName: string;
};

export default function PollUserInfoSection({
    userPic,
    displayName,
}: PollUserInfoSectionProps) {
    return (
        <div className="flex items-center gap-4">
            <img
                loading="lazy"
                className="w-8 h-8 object-cover rounded-full"
                src={`data:image/png;base64,${userPic}`}
                alt="User avatar"
            />
            <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center h-full"> by:</span>
                <span className="flex items-center h-full text-base font-bold">
                    {displayName}
                </span>
            </div>
        </div>
    );
}
