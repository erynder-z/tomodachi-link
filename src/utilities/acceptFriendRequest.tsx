import { InfoType } from '../types/infoType';
import { FaExclamationTriangle, FaRegSmile } from 'react-icons/fa';
import { handleFetchErrors } from './handleFetchErrors';

export const acceptFriendRequest = async (
    token: string,
    currentUserId: string,
    requestUserId: string,
    handleFetchUserData: () => void,
    setInfo: (info: InfoType | null) => void
) => {
    try {
        const serverURL = import.meta.env.VITE_SERVER_URL;
        const requestBody = {
            currentUserId,
            requestUserId,
        };
        const response = await fetch(
            `${serverURL}/api/v1/users/${requestUserId}/acceptFriendRequest`,
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
            message: 'Friend request accepted!',
            icon: <FaRegSmile />,
        });
        handleFetchUserData();
    } catch (err: unknown) {
        setInfo({
            message: 'Unable to accept friend request!',
            icon: <FaExclamationTriangle />,
        });
    }
};
