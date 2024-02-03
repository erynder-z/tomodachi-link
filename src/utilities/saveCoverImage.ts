import { InfoType } from '../types/infoTypes';
import { handleFetchErrors } from './handleFetchErrors';

/**
 * Saves the cover image name associated with a user by making a PATCH request.
 *
 * @param {string} token - The authentication token used for authorization.
 * @param {string | null} coverImageName - The name of the cover image to be saved (or null to clear the cover image).
 * @param {() => void} handleFetchUserData - A function to fetch and update user data after the cover image is saved.
 * @param {(info: InfoType | null) => void} setInfo - A function to update information messages.
 * @returns {Promise<void>} - A promise that resolves after attempting to save the cover image.
 */
export const saveCoverImage = async (
    token: string,
    coverImageName: string | null,
    handleFetchUserData: () => void,
    setInfo: (info: InfoType | null) => void
): Promise<void> => {
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
