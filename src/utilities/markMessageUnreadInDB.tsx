import { InfoType } from '../types/infoType';
import { FaExclamationTriangle } from 'react-icons/fa';
import { handleFetchErrors } from './handleFetchErrors';

export const markMessageUnreadInDB = async (
    token: string,
    conversationId: string,
    setInfo: (info: InfoType | null) => void
) => {
    try {
        const serverURL = import.meta.env.VITE_SERVER_URL;
        const response = await fetch(
            `${serverURL}/api/v1/message/${conversationId}/unread`,
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
    } catch (err: unknown) {
        setInfo({
            typeOfInfo: 'bad',
            message: 'Unable to mark message as read!',
            icon: <FaExclamationTriangle />,
        });
    }
};
