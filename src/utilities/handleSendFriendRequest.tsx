import React from 'react';
import { InfoType } from '../types/infoType';
import { sendFriendRequest } from './sendFriendRequest';

export const handleSendFriendRequest = (
    token: string | null,
    currentUserId: string | undefined,
    otherUserId: string | undefined,
    setInfo: (info: InfoType | null) => void,
    setDisableButton?: React.Dispatch<React.SetStateAction<boolean>>
) => {
    if (token && currentUserId && otherUserId) {
        sendFriendRequest(token, currentUserId, otherUserId, setInfo);
        if (setDisableButton) setDisableButton(true);
    }
};
