import { InfoType } from '../types/infoType';
import { handleFetchErrors } from './handleFetchErrors';

export const fetchFeed = async (
    token: string,
    setInfo: (info: InfoType | null) => void,
    skip: number | null = 0,
    friendList: string[]
) => {
    try {
        const serverURL = import.meta.env.VITE_SERVER_URL;
        const requestBody = {
            friendList,
        };

        const response = await fetch(`${serverURL}/api/v1/feed?skip=${skip}`, {
            method: 'POST', // use POST instead of GET in order to send the friendList as payload
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
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
