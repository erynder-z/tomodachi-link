import { displayErrorInfo } from '../components/UiElements/UserNotification/displayErrorInfo';
import { InfoType } from '../types/infoTypes';
import { handleFetchErrors } from './handleFetchErrors';

/**
 * Asynchronous function for making backend API requests.
 *
 * @async
 * @function
 * @param {string | undefined} token - The authentication token for the request.
 * @param {(info: InfoType | null) => void} setInfo - The function to set information messages.
 * @param {string} apiEndpointURL - The API endpoint URL.
 * @param {string} method - The HTTP method for the request (e.g., 'GET', 'POST').
 * @param {string} errorMessage - The message to display in case of an error.
 * @returns {Promise<any>} A promise that resolves with the response data or rejects with an error.
 */
export const backendFetch = async (
    token: string | undefined,
    setInfo: (info: InfoType | null) => void,
    apiEndpointURL: string,
    method: string,
    errorMessage: string
): Promise<any> => {
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
        displayErrorInfo(setInfo, errorMessage, '👻');
    }
};
