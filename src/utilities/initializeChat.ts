import { InfoType } from '../types/infoTypes';
import { handleFetchErrors } from './handleFetchErrors';

/**
 * Initializes a chat conversation with a specified chat partner by making a POST request to the server.
 *
 * @param {string} token - The authentication token used for authorization.
 * @param {string} chatPartnerId - The unique identifier of the chat partner.
 * @param {(info: InfoType | null) => void} setInfo - A function to update information messages.
 * @returns {Promise<any>} - A promise that resolves with the server response after attempting to initialize the chat.
 */
export const initializeChat = async (
    token: string,
    chatPartnerId: string,
    setInfo: (info: InfoType | null) => void
): Promise<any> => {
    try {
        const SERVER_URL = import.meta.env.VITE_SERVER_URL;

        const response = await fetch(`${SERVER_URL}/api/v1/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ chatPartnerId }),
        });

        if (!response.ok) handleFetchErrors(response, setInfo);

        return response;
    } catch (err: unknown) {
        const ERROR_INFO = {
            typeOfInfo: 'bad',
            message: 'Unable to initialize chat!',
            icon: '👻',
        };
        setInfo(ERROR_INFO as InfoType);
    }
};
