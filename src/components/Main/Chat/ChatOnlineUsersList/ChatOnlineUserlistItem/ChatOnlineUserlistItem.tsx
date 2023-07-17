import React from 'react';
import { MinimalUserTypes } from '../../../../../types/minimalUserTypes';
import { getCorrectUserpicFormat } from '../../../../../utilities/getCorrectUserpicFormat';
import useCurrentUserData from '../../../../../hooks/useCurrentUserData';
import useAuth from '../../../../../hooks/useAuth';
import useInfoCard from '../../../../../hooks/useInfoCard';
import { FaExclamationTriangle } from 'react-icons/fa';
import { initializeChat } from '../../../../../utilities/initializeChat';

type ChatOnlineUserlistItemProps = {
    listItemData: MinimalUserTypes;
    isOnline: boolean;
};

export default function ChatOnlineUserlistItem({
    listItemData,
    isOnline,
}: ChatOnlineUserlistItemProps) {
    const { token } = useAuth();
    const { currentUserData } = useCurrentUserData();
    const { setInfo } = useInfoCard();
    const { _id, firstName, lastName, userpic } = listItemData || {};

    const indicatorColor = isOnline ? 'green' : 'gray';
    const currentUserId = currentUserData?._id;
    const chatPartnerId = _id;

    const handleInitializeChat = async () => {
        if (token && currentUserId && chatPartnerId) {
            const chatMemberIds = {
                senderId: currentUserId,
                receiverId: chatPartnerId,
            };
            const response = await initializeChat(
                token,
                chatMemberIds,
                setInfo
            );
            if (!response || !response.ok) {
                setInfo({
                    typeOfInfo: 'bad',
                    message: 'Could not initialize chat!',
                    icon: <FaExclamationTriangle />,
                });
            }
        }
    };

    return (
        <div
            onClick={handleInitializeChat}
            className="flex items-center w-full gap-4 py-2 text-regularText cursor-pointer"
        >
            <div
                className={`w-3 h-3 rounded-full bg-${indicatorColor}-500`}
            ></div>
            <img
                loading="lazy"
                className="w-8 h-8 object-cover rounded-full"
                src={`data:image/png;base64,${getCorrectUserpicFormat(
                    userpic
                )}`}
                alt="User avatar"
            />
            <div className="overflow-hidden whitespace-nowrap text-ellipsis">
                {firstName} {lastName}
            </div>
        </div>
    );
}
