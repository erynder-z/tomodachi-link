import { FaExclamationTriangle } from 'react-icons/fa';
import { InfoType } from '../types/infoType';
import { handleFetchErrors } from './handleFetchErrors';

export const fetchOtherUserData = async (
    id: string | undefined,
    token: string,
    setUserPageData: (data: any) => void,
    setIsFriend: React.Dispatch<React.SetStateAction<boolean>>,
    setIsFriendRequestPending: React.Dispatch<React.SetStateAction<boolean>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setInfo: (info: InfoType | null) => void
) => {
    try {
        const serverURL = import.meta.env.VITE_SERVER_URL;
        const response = await fetch(`${serverURL}/api/v1/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            const data = await response.json();
            setUserPageData(data.user);
            setIsFriend(data.isFriend);
            setIsFriendRequestPending(data.isFriendRequestPending);
        } else {
            handleFetchErrors(response, setInfo);
        }
    } catch (err: unknown) {
        setInfo({
            message: 'Unable to fetch userdata!',
            icon: <FaExclamationTriangle />,
        });
    }
    setLoading(false);
};
