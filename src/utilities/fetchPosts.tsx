import { InfoType } from '../types/infoType';
import { handleFetchErrors } from './handleFetchErrors';

export const fetchPosts = async (
    id: string,
    token: string,
    setInfo: (info: InfoType | null) => void,
    skip: number | null = 0
) => {
    try {
        const serverURL = import.meta.env.VITE_SERVER_URL;
        const response = await fetch(
            `${serverURL}/api/v1/users/${id}/post?skip=${skip}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.ok) {
            const data = await response.json();
            return data.userPosts;
        } else {
            handleFetchErrors(response, setInfo);
        }
    } catch (err: unknown) {
        setInfo({
            typeOfInfo: 'bad',
            message: 'Unable to fetch posts!',
            icon: '👻',
        });
    }
};
