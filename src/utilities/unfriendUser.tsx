import { InfoType } from '../types/infoType';
import { handleFetchErrors } from './handleFetchErrors';
import { FaExclamationTriangle, FaRegSmile } from 'react-icons/fa';

export const unfriendUser = async (
    token: string,
    currentUserId: string,
    otherUserId: string,
    handleFetchUserData: () => void,
    handleFetchFriendData: () => void,
    setInfo: (info: InfoType | null) => void
) => {
    try {
        const serverURL = import.meta.env.VITE_SERVER_URL;
        const requestBody = {
            currentUserId,
            otherUserId,
        };
        const response = await fetch(
            `${serverURL}/api/v1/users/${otherUserId}/unfriend`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            }
        );

        if (!response.ok) {
            handleFetchErrors(response, setInfo);
        }

        setInfo({
            typeOfInfo: 'good',
            message: 'You are no longer friends!',
            icon: <FaRegSmile />,
        });
        handleFetchUserData();
        handleFetchFriendData();
    } catch (err: unknown) {
        setInfo({
            typeOfInfo: 'bad',
            message: 'Unable to send request!',
            icon: <FaExclamationTriangle />,
        });
    }
};
