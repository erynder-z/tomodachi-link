import { InfoType } from '../types/infoTypes';
import { handleFetchErrors } from './handleFetchErrors';

export const declineFriendRequest = async (
    token: string,
    currentUserId: string,
    otherUserId: string,
    handleFetchUserData: () => void,
    handleFetchFriendData: () => void,
    setInfo: (info: InfoType | null) => void
) => {
    try {
        const serverURL = import.meta.env.VITE_SERVER_URL;
        const requestBody = {
            currentUserId,
            otherUserId,
        };
        const response = await fetch(
            `${serverURL}/api/v1/users/${otherUserId}/declineFriendRequest`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            }
        );

        if (!response.ok) handleFetchErrors(response, setInfo);

        setInfo({
            typeOfInfo: 'good',
            message: 'Friend request declined!',
            icon: '😎',
        });
        handleFetchUserData();
        handleFetchFriendData();
    } catch (err: unknown) {
        setInfo({
            typeOfInfo: 'bad',
            message: 'Unable to decline friend request!',
            icon: '👻',
        });
    }
};
