import { InfoType } from '../types/infoTypes';
import { handleFetchErrors } from './handleFetchErrors';

export const fetchUserData = async (
    token: string,
    setInfo: (info: InfoType | null) => void
) => {
    try {
        const serverURL = import.meta.env.VITE_SERVER_URL;
        const response = await fetch(`${serverURL}/api/v1/userdata`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            const data = await response.json();
            return data.user;
        } else {
            handleFetchErrors(response, setInfo);
        }
    } catch (err: unknown) {
        setInfo({
            typeOfInfo: 'bad',
            message: 'Unable to fetch userdata!',
            icon: '👻',
        });
    }
};
