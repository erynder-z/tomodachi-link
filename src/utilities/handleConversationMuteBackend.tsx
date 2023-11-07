import { InfoType } from '../types/infoTypes';
import { handleFetchErrors } from './handleFetchErrors';

export const handleConversationMuteBackend = async (
    token: string,
    conversationId: string,
    setInfo: (info: InfoType | null) => void
) => {
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
