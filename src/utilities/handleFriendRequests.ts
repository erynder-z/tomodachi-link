import { InfoType } from '../types/infoTypes';
import { handleFetchErrors } from './handleFetchErrors';

/**
 * Handles friend requests (send, accept, or decline) by making a PATCH request to the server,
 * updating the information card based on the success or failure of the request,
 * and optionally triggering data fetch functions.
 *
 * @param {string} token - User authentication token.
 * @param {string} otherUserId - The ID of the other user involved in the friend request.
 * @param {(info: InfoType | null) => void} setInfo - Function to set information card state.
 * @param {string} requestType - Type of friend request operation ('send', 'accept', 'decline').
 * @param {(() => void) | undefined} [handleFetchUserData] - Optional function to fetch user data.
 * @param {(() => void) | undefined} [handleFetchFriendData] - Optional function to fetch friend data.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export const handleFriendRequest = async (
    token: string,
    otherUserId: string,
    setInfo: (info: InfoType | null) => void,
    requestType: string,
    handleFetchUserData?: () => void,
    handleFetchFriendData?: () => void
): Promise<void> => {
    try {
        const SERVER_URL = import.meta.env.VITE_SERVER_URL;
        const requestBody = {
            otherUserId,
        };

        const response = await fetch(
            `${SERVER_URL}/api/v1/users/${otherUserId}/request/${requestType}`,
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

        const SUCCESS_INFO = {
            typeOfInfo: 'good',
            message: successMessage,
            icon: '🤝',
        };

        setInfo(SUCCESS_INFO as InfoType);

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

        const failedInfo = {
            typeOfInfo: 'bad',
            message: failedMessage,
            icon: '👻',
        };

        setInfo(failedInfo as InfoType);
    }
};
