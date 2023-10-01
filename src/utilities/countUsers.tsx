import { InfoType } from '../types/infoTypes';
import { handleFetchErrors } from './handleFetchErrors';

export const countUsers = async (setInfo: (info: InfoType | null) => void) => {
    try {
        const serverURL = import.meta.env.VITE_SERVER_URL;
        const response = await fetch(`${serverURL}/api/v1/users/count`);
        if (response.ok) {
            const data = await response.json();
            return data.numberOfUsers;
        } else {
            handleFetchErrors(response, setInfo);
        }
    } catch (err: unknown) {
        setInfo({
            typeOfInfo: 'bad',
            message: 'Unable to fetch number of users!',
            icon: '👻',
        });
    }
};
