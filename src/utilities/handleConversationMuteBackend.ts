import { InfoType } from '../types/infoTypes';
import { handleFetchErrors } from './handleFetchErrors';

/**
 * Handles muting a conversation on the backend by sending a PATCH request.
 *
 * @param {string} token - User authentication token.
 * @param {string} conversationId - Unique identifier for the conversation to be muted.
 * @param {(info: InfoType | null) => void} setInfo - Function to set information card state.
 *
 * @returns {Promise<any>} - A promise representing the response from the backend.
 */
export const handleConversationMuteBackend = async (
    token: string,
    conversationId: string,
    setInfo: (info: InfoType | null) => void
): Promise<any> => {
    try {
        const SERVER_URL = import.meta.env.VITE_SERVER_URL;

        const response = await fetch(
            `${SERVER_URL}/api/v1/chat/${conversationId}/mute`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) handleFetchErrors(response, setInfo);

        return response;
    } catch (err: unknown) {
        const ERROR_INFO = {
            typeOfInfo: 'bad',
            message: 'Unable to mute chat on backend!',
            icon: '👻',
        };
        setInfo(ERROR_INFO as InfoType);
    }
};
