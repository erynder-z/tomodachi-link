import { InfoType } from '../../../types/infoTypes';

/**
 * Function to display success information using the provided setInfo function.
 *
 * @function
 * @param {Function} setInfo - Function to set the information to be displayed.
 * @param {string} successMessage - The success message to be displayed.
 * @param {string} emoji - The emoji icon to be displayed with the success message.
 * @returns {void}
 */
export const displaySuccessInfo = (
    setInfo: (info: InfoType | null) => void,
    successMessage: string,
    emoji: string
): void => {
    /**
     * Object representing success information.
     *
     * @type {InfoType}
     */
    const successInfo: InfoType = {
        typeOfInfo: 'good',
        message: successMessage,
        icon: emoji,
    };
    setInfo(successInfo as InfoType);
};
