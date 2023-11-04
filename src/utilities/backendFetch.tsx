import { InfoType } from '../types/infoTypes';
import { handleFetchErrors } from './handleFetchErrors';

export const backendFetch = async (
    token: string | undefined,
    setInfo: (info: InfoType | null) => void,
    apiEndpointURL: string,
    method: string,
    errorMessage: string
) => {
    try {
        const serverURL = import.meta.env.VITE_SERVER_URL;
        const headers: Record<string, string> = {};

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(`${serverURL}${apiEndpointURL}`, {
            method: method,
            headers,
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            handleFetchErrors(response, setInfo);
        }
    } catch (err: unknown) {
        const errorInfo = {
            typeOfInfo: 'bad',
            message: errorMessage,
            icon: '👻',
        };
        setInfo(errorInfo as InfoType);
    }
};
