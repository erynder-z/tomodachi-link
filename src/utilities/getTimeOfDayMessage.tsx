import { FaSun, FaMoon } from 'react-icons/fa';
import { InfoType } from '../types/infoType';

export const getTimeOfDayMessage = (): InfoType => {
    const date = new Date();
    const hour = date.getHours();

    if (hour < 12) {
        return {
            typeOfInfo: 'greeting',
            message: 'Good morning, ',
            icon: <FaSun />,
        };
    } else if (hour < 18) {
        return {
            typeOfInfo: 'greeting',
            message: 'Good afternoon, ',
            icon: <FaSun />,
        };
    } else {
        return {
            typeOfInfo: 'greeting',
            message: 'Good evening, ',
            icon: <FaMoon />,
        };
    }
};
