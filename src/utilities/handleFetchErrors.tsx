import { FaExclamationTriangle } from 'react-icons/fa';
import { InfoType } from '../types/infoType';

export const handleFetchErrors = async (
    response: Response,
    setInfo: (info: InfoType | null) => void
) => {
    const data = await response.json();
    const errorMessages = data.errors;
    const message = errorMessages
        .map((error: { msg: string }) => error.msg)
        .join(', ');

    setInfo({
        typeOfInfo: 'bad',
        message: message,
        icon: <FaExclamationTriangle />,
    });

    throw new Error(`Error: ${response.status} ${response.statusText}`);
};
