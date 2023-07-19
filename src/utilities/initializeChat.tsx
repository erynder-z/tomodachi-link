import { InfoType } from '../types/infoType';
import { FaExclamationTriangle } from 'react-icons/fa';
import { handleFetchErrors } from './handleFetchErrors';
import { ChatMemberIdsType } from '../types/chatMemberIds';

export const initializeChat = async (
    token: string,
    chatMemberIds: ChatMemberIdsType,
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
            body: JSON.stringify(chatMemberIds),
        });

        if (response.status === 304) {
            return null;
        }

        if (!response.ok) {
            handleFetchErrors(response, setInfo);
        }

        return response;
    } catch (err: unknown) {
        setInfo({
            typeOfInfo: 'bad',
            message: 'Could not initialize chat!',
            icon: <FaExclamationTriangle />,
        });
    }
};
