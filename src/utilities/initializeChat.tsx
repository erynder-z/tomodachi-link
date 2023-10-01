import { InfoType } from '../types/infoTypes';
import { handleFetchErrors } from './handleFetchErrors';

export const initializeChat = async (
    token: string,
    chatPartnerId: string,
    setInfo: (info: InfoType | null) => void
) => {
    try {
        const serverURL = import.meta.env.VITE_SERVER_URL;

        const response = await fetch(`${serverURL}/api/v1/chat`, {
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
        setInfo({
            typeOfInfo: 'bad',
            message: 'Could not initialize chat!',
            icon: '👻',
        });
    }
};
