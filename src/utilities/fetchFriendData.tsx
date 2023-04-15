import { FaExclamationTriangle } from 'react-icons/fa';
import { InfoType } from '../types/infoType';
import { handleFetchErrors } from './handleFetchErrors';

export const fetchFriendData = async (
    token: string,
    setInfo: (info: InfoType | null) => void
) => {
    try {
        const serverURL = import.meta.env.VITE_SERVER_URL;
        const response = await fetch(`${serverURL}/api/v1/frienddata`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            const data = await response.json();
            return data.friendDataList;
        } else {
            handleFetchErrors(response, setInfo);
        }
    } catch (err: unknown) {
        setInfo({
            message: 'Unable to fetch friend data!',
            icon: <FaExclamationTriangle />,
        });
    }
};
