import { InfoType } from '../types/infoType';
import { handleFetchErrors } from './handleFetchErrors';

export const sendFriendRequest = async (
    token: string,
    currentUserId: string,
    otherUserId: string,
    setInfo: (info: InfoType | null) => void
) => {
    try {
        const serverURL = import.meta.env.VITE_SERVER_URL;
        const requestBody = {
            currentUserId,
            otherUserId,
        };
        const response = await fetch(
            `${serverURL}/api/v1/users/${otherUserId}/friendrequest`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            }
        );

        if (!response.ok) {
            handleFetchErrors(response, setInfo);
        }

        setInfo({
            typeOfInfo: 'good',
            message: 'Friend request sent!',
            icon: '🍵',
        });
    } catch (err: unknown) {
        setInfo({
            typeOfInfo: 'bad',
            message: 'Unable to send friend request!',
            icon: '👻',
        });
    }
};
