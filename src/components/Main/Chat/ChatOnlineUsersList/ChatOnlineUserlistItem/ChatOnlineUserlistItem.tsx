import React from 'react';
import { MinimalUserTypes } from '../../../../../types/minimalUserTypes';
import { getCorrectUserpicFormat } from '../../../../../utilities/getCorrectUserpicFormat';
import useAuth from '../../../../../hooks/useAuth';
import useInfoCard from '../../../../../hooks/useInfoCard';
import { FaExclamationTriangle } from 'react-icons/fa';
import { initializeChat } from '../../../../../utilities/initializeChat';
import { ChatConversationType } from '../../../../../types/chatConversationType';

type ChatOnlineUserlistItemProps = {
    listItemData: MinimalUserTypes;
    isOnline: boolean;
    setActiveChat: React.Dispatch<
        React.SetStateAction<ChatConversationType | null>
    >;
};

export default function ChatOnlineUserlistItem({
    listItemData,
    isOnline,
    setActiveChat,
}: ChatOnlineUserlistItemProps) {
    const { token } = useAuth();
    const { setInfo } = useInfoCard();
    const { _id, firstName, lastName, userpic } = listItemData || {};

    const indicatorColor = isOnline ? 'green' : 'gray';
    const chatPartnerId = _id;

    const handleInitializeChat = async () => {
        if (token && chatPartnerId) {
            const response = await initializeChat(
                token,
                chatPartnerId,
                setInfo
            );

            if (response && response.ok) {
                const data = await response.json();
                data.existingConversation
                    ? setActiveChat(data.existingConversation)
                    : setActiveChat(data.savedConversation);
            }

            if (response && !response.ok) {
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
