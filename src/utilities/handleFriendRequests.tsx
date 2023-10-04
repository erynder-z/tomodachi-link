import { InfoType } from '../types/infoTypes';
import { handleFetchErrors } from './handleFetchErrors';

export const handleFriendRequest = async (
    token: string,
    otherUserId: string,
    setInfo: (info: InfoType | null) => void,
    requestType: string,
    handleFetchUserData?: () => void,
    handleFetchFriendData?: () => void
) => {
    try {
        const serverURL = import.meta.env.VITE_SERVER_URL;
        const requestBody = {
            otherUserId,
        };

        const response = await fetch(
            `${serverURL}/api/v1/users/${otherUserId}/request/${requestType}`,
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

        let successMessage = '';

        switch (requestType) {
            case 'send':
                successMessage = 'Friend request sent!';
                break;
            case 'accept':
                successMessage = 'Friend request accepted!';
                break;
            case 'decline':
                successMessage = 'Friend request declined!';
                break;
            default:
                successMessage = `Success!`;
        }

        setInfo({
            typeOfInfo: 'good',
            message: successMessage,
            icon: '🤝',
        });

        if (handleFetchUserData) handleFetchUserData();
        if (handleFetchFriendData) handleFetchFriendData();
    } catch (err: unknown) {
        let failedMessage = '';

        switch (requestType) {
            case 'send':
                failedMessage = 'Unable to send friend request!';
                break;
            case 'accept':
                failedMessage = 'Unable to accept friend request!';
                break;
            case 'decline':
                failedMessage = 'Unable to decline friend request!';
                break;
            default:
                failedMessage = `Failed!`;
        }

        setInfo({
            typeOfInfo: 'bad',
            message: failedMessage,
            icon: '🥳',
        });
    }
};
