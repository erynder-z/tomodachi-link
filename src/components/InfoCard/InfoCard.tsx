import { useEffect, useState } from 'react';
import { InfoType } from '../../types/infoType';
import { FaTimes } from 'react-icons/fa';

type InfoCardProps = {
    setInfo: React.Dispatch<React.SetStateAction<InfoType | null>>;
    info?: InfoType | null;
};

const InfoCard = ({ setInfo, info }: InfoCardProps) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const getBgColorClass = (typeOfInfo: string | undefined) => {
        switch (typeOfInfo) {
            case 'good':
                return 'bg-green-500';
            case 'bad':
                return 'bg-red-500';
            case 'neutral':
                return 'bg-yellow-500';
            default:
                break;
        }
    };

    const bgColorClass = getBgColorClass(info?.typeOfInfo);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        if (info) {
            timer = setTimeout(() => {
                setIsVisible(true);
                setTimeout(() => {
                    setInfo(null);
                }, 5000);
                setTimeout(() => {
                    setIsVisible(false);
                }, 3000);
            }, 50);
        }

        return () => clearTimeout(timer);
    }, [info, setInfo]);

    return (
        <div className="fixed bottom-full w-full z-50">
            <div
                className={`fixed bottom-0 w-full ${bgColorClass} text-white p-4 flex items-center justify-between transform transition-transform duration-500 ease-in-out ${
                    isVisible ? 'translate-y-0' : 'translate-y-full'
                }`}
            >
                <h2 className="text-lg font-medium">{info?.message}</h2>
                <button onClick={() => setInfo(null)} className="ml-4">
                    <FaTimes />
                </button>
            </div>
        </div>
    );
};

export default InfoCard;
