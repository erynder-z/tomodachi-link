import { InfoType } from '../types/infoTypes';

export const handleFetchErrors = async (
    response: Response,
    setInfo: (info: InfoType | null) => void
) => {
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
