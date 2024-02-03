import { InfoType } from '../types/infoTypes';
import { handleFetchErrors } from './handleFetchErrors';

/**
 * Handles chat messages in the database by sending a PATCH request to mark messages based on the specified operation.
 *
 * @param {string} token - User authentication token.
 * @param {string} conversationId - ID of the conversation containing the messages.
 * @param {(info: InfoType | null) => void} setInfo - Function to set information card state.
 * @param {string} typeOfOperation - Type of operation to perform on the messages (e.g., 'read', 'unread', 'delete').
 *
 * @returns {Promise<void>} - A Promise that resolves after handling the operation.
 */
export const handleChatMessagesInDB = async (
    token: string,
    conversationId: string,
    setInfo: (info: InfoType | null) => void,
    typeOfOperation: string
) => {
    try {
        const SERVER_URL = import.meta.env.VITE_SERVER_URL;
        const response = await fetch(
            `${SERVER_URL}/api/v1/message/${conversationId}/${typeOfOperation}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) handleFetchErrors(response, setInfo);
    } catch (err: unknown) {
        const errorInfo = {
            typeOfInfo: 'bad',
            message: `Unable to mark message as ${typeOfOperation}!`,
            icon: '👻',
        };
        setInfo(errorInfo as InfoType);
    }
};
