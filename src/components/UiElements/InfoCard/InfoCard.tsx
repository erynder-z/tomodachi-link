import { useEffect, useState } from 'react';
import { InfoType } from '../../../types/infoTypes';
import { FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

type infoCardPropsType = {
    info: InfoType | null;
};

/**
 * React component for displaying informational messages.
 *
 * @component
 * @param {InfoCardPropsType} props - The component props.
 * @param {InfoType | null} props.info - Information data to be displayed in the InfoCard.
 * @returns {JSX.Element} The rendered InfoCard component.
 */
const InfoCard = ({ info }: infoCardPropsType): JSX.Element => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    /**
     * Get the background color class based on the type of information.
     *
     * @function
     * @param {string | undefined} typeOfInfo - The type of information.
     * @returns {string} The background color class.
     */
    const getBgColorClass = (typeOfInfo: string | undefined): string => {
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

    /**
     * Effect to control the visibility of the InfoCard and set a timer to hide it after 3000 milliseconds.
     *
     * @effect
     * @returns {void}
     */
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

    /**
     * Render the InfoCard component.
     *
     * @type {JSX.Element}
     */
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
