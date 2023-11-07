import { InfoType } from '../types/infoTypes';
import { handleFetchErrors } from './handleFetchErrors';

export const saveCoverImage = async (
    token: string,
    coverImageName: string | null,
    handleFetchUserData: () => void,
    setInfo: (info: InfoType | null) => void
) => {
    try {
        const SERVER_URL = import.meta.env.VITE_SERVER_URL;
        const requestBody = {
            coverImageName,
        };
        const response = await fetch(`${SERVER_URL}/api/v1/userdata/cover`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) handleFetchErrors(response, setInfo);

        const SUCCESS_INFO = {
            typeOfInfo: 'good',
            message: 'Saved!',
            icon: '👍',
        };

        setInfo(SUCCESS_INFO as InfoType);
        handleFetchUserData();
    } catch (err: unknown) {
        const ERROR_INFO = {
            typeOfInfo: 'bad',
            message: 'Unable to save!',
            icon: '👻',
        };
        setInfo(ERROR_INFO as InfoType);
    }
};
