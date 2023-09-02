import { InfoType } from '../types/infoType';
import { initializeChat } from './initializeChat';
import { ChatConversationType } from '../types/chatConversationType';

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

        if (response && !response.ok) {
            setInfo({
                typeOfInfo: 'bad',
                message: 'Could not initialize chat!',
                icon: '👻',
            });
        }
    }
};
