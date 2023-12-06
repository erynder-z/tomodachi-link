import { InfoType } from '../../../types/infoTypes';

export const displayErrorInfo = (
    setInfo: (info: InfoType | null) => void,
    errorMessage: string,
    emoji: string
) => {
    const failedInfo = {
        typeOfInfo: 'bad',
        message: errorMessage,
        icon: emoji,
    };
    setInfo(failedInfo as InfoType);
};
