import { InfoType } from '../types/infoTypes';
import { handleFetchErrors } from './handleFetchErrors';

export const fetchFeed = async (
    token: string,
    setInfo: (info: InfoType | null) => void,
    skip: number | null = 0
) => {
    try {
        const serverURL = import.meta.env.VITE_SERVER_URL;

        const response = await fetch(`${serverURL}/api/v1/feed?skip=${skip}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data.paginatedFeed;
        } else {
            handleFetchErrors(response, setInfo);
        }
    } catch (err: unknown) {
        setInfo({
            typeOfInfo: 'bad',
            message: 'Unable to fetch feed!',
            icon: '👻',
        });
    }
};
