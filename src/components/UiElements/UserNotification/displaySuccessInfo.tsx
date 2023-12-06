import { InfoType } from '../../../types/infoTypes';

export const displaySuccessInfo = (
    setInfo: (info: InfoType | null) => void,
    successMessage: string,
    emoji: string
) => {
    const successInfo = {
        typeOfInfo: 'good',
        message: successMessage,
        icon: emoji,
    };
    setInfo(successInfo as InfoType);
};
