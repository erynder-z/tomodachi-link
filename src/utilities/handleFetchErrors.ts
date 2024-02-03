import { InfoType } from '../types/infoTypes';

/**
 * Handles authentication failure in passport by setting an information card with an error message.
 *
 * @param {(info: InfoType | null) => void} setInfo - Function to set information card state.
 * @returns {void}
 */
const handlePassportAuthenticationFail = (
    setInfo: (info: InfoType | null) => void
): void => {
    const failedInfo = {
        typeOfInfo: 'bad',
        message: 'Token expired. Please log in again!',
        icon: '👻',
    };
    setInfo(failedInfo as InfoType);
};

/**
 * Handles generic fetch failure by parsing the response, extracting error messages,
 * setting an information card with the error message, and throwing an error.
 *
 * @param {Response} response - The response object from the fetch operation.
 * @param {(info: InfoType | null) => void} setInfo - Function to set information card state.
 * @throws {Error} Throws an error with the status and statusText of the response.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
const handleFetchFail = async (
    response: Response,
    setInfo: (info: InfoType | null) => void
): Promise<void> => {
    const data = await response.json();
    const errorMessages = data.errors;
    const message = errorMessages
        .map((error: { msg: string }) => error.msg)
        .join(', ');
    const failedInfo = {
        typeOfInfo: 'bad',
        message: message,
        icon: '👻',
    };

    setInfo(failedInfo as InfoType);

    throw new Error(`Error: ${response.status} ${response.statusText}`);
};

/**
 * Handles fetch errors by checking the response status.
 * If the status is 401, it handles passport authentication failure.
 * Otherwise, it delegates to the generic fetch fail handler.
 *
 * @param {Response} response - The response object from the fetch operation.
 * @param {(info: InfoType | null) => void} setInfo - Function to set information card state.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export const handleFetchErrors = async (
    response: Response,
    setInfo: (info: InfoType | null) => void
): Promise<void> => {
    if (response.status === 401) {
        handlePassportAuthenticationFail(setInfo);
    }
    handleFetchFail(response, setInfo);
};
