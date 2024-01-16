import { useEffect, useState } from 'react';
import { InfoType } from '../../../types/infoTypes';
import { FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

type infoCardPropsType = {
    info: InfoType | null;
};

const InfoCard = ({ info }: infoCardPropsType) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const getBgColorClass = (typeOfInfo: string | undefined) => {
        switch (typeOfInfo) {
            case 'good':
                return 'bg-green-700/90';
            case 'bad':
                return 'bg-rose-900/90';
            case 'neutral':
                return 'bg-fuchsia-900/90';
            case 'greeting':
                return 'bg-slate-600/90';
            default:
                return 'bg-slate-600/90';
        }
    };

    const typeOfInfo = info?.typeOfInfo;
    const bgColorClass = getBgColorClass(typeOfInfo);

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
        <div className="fixed top-full w-full z-50 font-regularFont">
            <div
                className={`fixed top-0 w-full ${bgColorClass} text-regularTextDark rounded-b lg:rounded-b-lg text-md md:text-3xl p-4 md:py-8 md:px-16 flex items-center justify-between transform transition-transform duration-250 ease-in-out ${
                    isVisible ? '-translate-y-0' : '-translate-y-full'
                }`}
            >
                <span
                    className={`${
                        typeOfInfo === 'greeting' ? 'text-amber-400' : ' '
                    }`}
                >
                    {info?.icon}
                </span>
                <h2 className="text-sm md:text-2xl text-center m-0">
                    {info?.message}
                </h2>
                <motion.button
                    onClick={() => setIsVisible(false)}
                    whileTap={{ scale: 0.97 }}
                    className="text-red-400 hover:text-red-500 ml-4"
                >
                    <FaTimes />
                </motion.button>
            </div>
        </div>
    );
};

export default InfoCard;
