import { InfoType } from './infoType';

export type TimeOfDayMessageType = {
    typeOfInfo: InfoType;
    message: string;
    icon: JSX.Element;
};
