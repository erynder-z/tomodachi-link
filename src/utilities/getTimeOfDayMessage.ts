import { InfoType } from '../types/infoTypes';

/**
 * Gets a time of day greeting message based on the current hour.
 *
 * @returns {InfoType} - Information object containing a greeting message, type, and icon.
 */
export const getTimeOfDayMessage = (): InfoType => {
    const date = new Date();
    const hour = date.getHours();

    const MORNING_INFO = {
        typeOfInfo: 'greeting',
        message: 'Good morning, ',
        icon: '🌞',
    };

    const AFTERNOON_INFO = {
        typeOfInfo: 'greeting',
        message: 'Good afternoon, ',
        icon: '🌞',
    };

    const EVENING_INFO = {
        typeOfInfo: 'greeting',
        message: 'Good evening, ',
        icon: '🌛',
    };

    if (hour < 12) {
        return MORNING_INFO as InfoType;
    } else if (hour < 18) {
        return AFTERNOON_INFO as InfoType;
    } else {
        return EVENING_INFO as InfoType;
    }
};
