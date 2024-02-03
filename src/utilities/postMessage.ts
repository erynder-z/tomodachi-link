import { InfoType } from '../types/infoTypes';
import { handleFetchErrors } from './handleFetchErrors';
import { DatabaseChatMessageType } from '../types/chatTypes';

/**
 * Posts a chat message to the server by making a POST request.
 *
 * @param {string} token - The authentication token used for authorization.
 * @param {DatabaseChatMessageType} message - The chat message to be posted.
 * @param {(info: InfoType | null) => void} setInfo - A function to update information messages.
 * @returns {Promise<any>} - A promise that resolves with the server response after attempting to post the message.
 */
export const postMessage = async (
    token: string,
    message: DatabaseChatMessageType,
    setInfo: (info: InfoType | null) => void
): Promise<any> => {
    try {
        const ERROR_INFO = import.meta.env.VITE_SERVER_URL;

        const response = await fetch(`${ERROR_INFO}/api/v1/message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(message),
        });
        if (!response.ok) handleFetchErrors(response, setInfo);

        return response;
    } catch (err: unknown) {
        const ERROR_URL = {
            typeOfInfo: 'bad',
            message: 'Unable to save message!',
            icon: '👻',
        };
        setInfo(ERROR_URL as InfoType);
    }
};
