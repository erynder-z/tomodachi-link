import React from 'react';
import { TbMessages } from 'react-icons/tb';
import { CurrentUserDataType } from '../../../../../types/currentUserDataType';
import { MinimalUserTypes } from '../../../../../types/minimalUserTypes';
import { getCorrectUserpicFormat } from '../../../../../utilities/getCorrectUserpicFormat';

type ChatroomHeaderProps = {
    currentUserData: CurrentUserDataType | null;
    partnerData: MinimalUserTypes | null;
};

export default function ChatroomHeader({
    currentUserData,
    partnerData,
}: ChatroomHeaderProps) {
    return (
        <header className="flex justify-around py-4 sticky -top-4 bg-background2 dark:bg-canvasDark text-regularText dark:text-regularTextDark shadow-md">
            <div className="flex flex-col justify-center items-center">
                <img
                    loading="lazy"
                    className="w-12 h-12 object-cover"
                    src={`data:image/png;base64,${getCorrectUserpicFormat(
                        currentUserData?.userpic.data
                    )}`}
                    alt="User avatar"
                />
                <div className="text-sm overflow-hidden whitespace-nowrap text-ellipsis">
                    You
                </div>
            </div>
            <div className="flex flex-col justify-center items-center font-bold text-xl">
                <TbMessages className="text-7xl" />
                Chat
            </div>

            <div className="flex flex-col justify-center items-center">
                <img
                    loading="lazy"
                    className="w-12 h-12 object-cover"
                    src={`data:image/png;base64,${getCorrectUserpicFormat(
                        partnerData?.userpic
                    )}`}
                    alt="User avatar"
                />
                <div className="text-sm overflow-hidden whitespace-nowrap text-ellipsis">
                    {partnerData?.firstName} {partnerData?.lastName}
                </div>
            </div>
        </header>
    );
}
