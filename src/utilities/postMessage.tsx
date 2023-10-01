import { InfoType } from '../types/infoTypes';
import { handleFetchErrors } from './handleFetchErrors';
import { DatabaseChatMessageType } from '../types/chatTypes';

export const postMessage = async (
    token: string,
    message: DatabaseChatMessageType,
    setInfo: (info: InfoType | null) => void
) => {
    try {
        const serverURL = import.meta.env.VITE_SERVER_URL;

        const response = await fetch(`${serverURL}/api/v1/message`, {
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
        setInfo({
            typeOfInfo: 'bad',
            message: 'Message not saved!',
            icon: '👻',
        });
    }
};
