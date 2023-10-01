import { InfoType } from '../types/infoTypes';

export const getTimeOfDayMessage = (): InfoType => {
    const date = new Date();
    const hour = date.getHours();

    if (hour < 12) {
        return {
            typeOfInfo: 'greeting',
            message: 'Good morning, ',
            icon: '🌞',
        };
    } else if (hour < 18) {
        return {
            typeOfInfo: 'greeting',
            message: 'Good afternoon, ',
            icon: '🌞',
        };
    } else {
        return {
            typeOfInfo: 'greeting',
            message: 'Good evening, ',
            icon: '🌛',
        };
    }
};
