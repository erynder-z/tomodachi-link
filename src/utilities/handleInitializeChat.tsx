import { InfoType } from '../types/infoTypes';
import { initializeChat } from './initializeChat';
import { ChatConversationType } from '../types/chatTypes';

export const handleInitializeChat = async (
    token: string | null,
    setInfo: (info: InfoType | null) => void,
    chatPartnerId: string,
    setActiveChat: (chat: ChatConversationType) => void
) => {
    if (token && chatPartnerId) {
        const response = await initializeChat(token, chatPartnerId, setInfo);
        if (response && response.ok) {
            const data = await response.json();
            data.existingConversation
                ? setActiveChat(data.existingConversation)
                : setActiveChat(data.savedConversation);
        }

        if ((response && !response.ok) || !response) {
            const failedInfo = {
                typeOfInfo: 'bad',
                message: 'Could not initialize chat!',
                icon: '👻',
            };
            setInfo(failedInfo as InfoType);
        }
    }
};
