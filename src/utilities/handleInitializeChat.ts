import { InfoType } from '../types/infoTypes';
import { initializeChat } from './initializeChat';
import { ChatConversationType } from '../types/chatTypes';

/**
 * Handles the initialization of a chat session, making an asynchronous call to the server
 * to establish or retrieve a conversation with a specified chat partner.
 *
 * @param {string | null} token - User authentication token.
 * @param {(info: InfoType | null) => void} setInfo - Function to set information card state.
 * @param {string} chatPartnerId - The ID of the chat partner involved in the conversation.
 * @param {(chat: ChatConversationType) => void} setActiveChat - Function to set the active chat state.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export const handleInitializeChat = async (
    token: string | null,
    setInfo: (info: InfoType | null) => void,
    chatPartnerId: string,
    setActiveChat: (chat: ChatConversationType) => void
): Promise<void> => {
    if (token && chatPartnerId) {
        const response = await initializeChat(token, chatPartnerId, setInfo);
        if (response && response.ok) {
            const data = await response.json();
            data.existingConversation
                ? setActiveChat(data.existingConversation)
                : setActiveChat(data.savedConversation);
        }

        if ((response && !response.ok) || !response) {
            const FAILED_INFO = {
                typeOfInfo: 'bad',
                message: 'Could not initialize chat!',
                icon: '👻',
            };
            setInfo(FAILED_INFO as InfoType);
        }
    }
};
