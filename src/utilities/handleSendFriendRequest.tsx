import { InfoType } from '../types/infoTypes';
import { handleFriendRequest } from './handleFriendRequests';

export const handleSendFriendRequest = (
    token: string | null,
    currentUserId: string | undefined,
    otherUserId: string | undefined,
    setInfo: (info: InfoType | null) => void,
    setDisableButton?: React.Dispatch<React.SetStateAction<boolean>>
) => {
    if (token && currentUserId && otherUserId) {
        const typeOfRequest = 'send';
        handleFriendRequest(
            token,
            currentUserId,
            otherUserId,
            setInfo,
            typeOfRequest
        );
        if (setDisableButton) setDisableButton(true);
    }
};
