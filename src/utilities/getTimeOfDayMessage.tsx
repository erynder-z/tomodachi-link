import { InfoType } from '../types/infoTypes';

export const getTimeOfDayMessage = (): InfoType => {
    const date = new Date();
    const hour = date.getHours();

    const morningInfo = {
        typeOfInfo: 'greeting',
        message: 'Good morning, ',
        icon: '🌞',
    };

    const afternoonInfo = {
        typeOfInfo: 'greeting',
        message: 'Good afternoon, ',
        icon: '🌞',
    };

    const eveningInfo = {
        typeOfInfo: 'greeting',
        message: 'Good evening, ',
        icon: '🌛',
    };

    if (hour < 12) {
        return morningInfo as InfoType;
    } else if (hour < 18) {
        return afternoonInfo as InfoType;
    } else {
        return eveningInfo as InfoType;
    }
};
