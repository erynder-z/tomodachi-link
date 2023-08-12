import { useEffect, useState } from 'react';
import { InfoType } from '../../../types/infoType';
import { FaTimes } from 'react-icons/fa';

type infoCardPropsType = {
    info: InfoType | null;
};

const InfoCard = ({ info }: infoCardPropsType) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const getBgColorClass = (typeOfInfo: string | undefined) => {
        switch (typeOfInfo) {
            case 'good':
                return 'bg-green-500';
            case 'bad':
                return 'bg-red-500';
            case 'neutral':
                return 'bg-yellow-500';
            case 'greeting':
                return 'bg-slate-500';
            default:
                return 'bg-gray-500';
        }
    };

    const bgColorClass = getBgColorClass(info?.typeOfInfo);

    useEffect(() => {
        if (info) {
            setIsVisible(true);
            const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
                setIsVisible(false);
            }, 3000);
            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
        }
    }, [info]);

    return (
        <div className="fixed top-full w-full z-50">
            <div
                className={`fixed top-0 w-full ${bgColorClass} text-white p-4 flex items-center justify-between transform transition-transform duration-500 ease-in-out ${
                    isVisible ? '-translate-y-0' : '-translate-y-full'
                }`}
            >
                {info?.icon}
                <h2 className="text-lg font-medium">{info?.message}</h2>
                <button onClick={() => setIsVisible(false)} className="ml-4">
                    <FaTimes />
                </button>
            </div>
        </div>
    );
};

export default InfoCard;
