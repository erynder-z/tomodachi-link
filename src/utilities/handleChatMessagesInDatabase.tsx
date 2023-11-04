import { InfoType } from '../types/infoTypes';
import { handleFetchErrors } from './handleFetchErrors';

export const handleChatMessagesInDB = async (
    token: string,
    conversationId: string,
    setInfo: (info: InfoType | null) => void,
    typeOfOperation: string
) => {
    try {
        const serverURL = import.meta.env.VITE_SERVER_URL;
        const response = await fetch(
            `${serverURL}/api/v1/message/${conversationId}/${typeOfOperation}`,
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
