import { InfoType } from '../types/infoType';
import { handleFetchErrors } from './handleFetchErrors';

export const handleConversationMuteBackend = async (
    token: string,
    conversationId: string,
    setInfo: (info: InfoType | null) => void
) => {
    try {
        const serverURL = import.meta.env.VITE_SERVER_URL;

        const response = await fetch(
            `${serverURL}/api/v1/chat/${conversationId}/mute`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) {
            handleFetchErrors(response, setInfo);
        }
        return response;
    } catch (err: unknown) {
        setInfo({
            typeOfInfo: 'bad',
            message: 'Could not too mute chat on backend!',
            icon: '👻',
        });
    }
};
