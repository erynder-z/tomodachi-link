import { InfoType } from '../types/infoTypes';
import { handleFetchErrors } from './handleFetchErrors';

export const handlePostReaction = async (
    token: string,
    setInfo: (info: InfoType | null) => void,
    _id: string,
    reaction: string
) => {
    try {
        const SERVER_URL = import.meta.env.VITE_SERVER_URL;
        const response = await fetch(
            `${SERVER_URL}/api/v1/post/${_id}/${reaction}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) handleFetchErrors(response, setInfo);

        const SUCCESS_INFO = {
            typeOfInfo: 'good',
            message: 'Reaction successful!',
            icon: '😎',
        };

        setInfo(SUCCESS_INFO as InfoType);
    } catch (err: unknown) {
        const ERROR_INFO = {
            typeOfInfo: 'bad',
            message: 'Unable to react to post!',
            icon: '👻',
        };
        setInfo(ERROR_INFO as InfoType);
    }
};
