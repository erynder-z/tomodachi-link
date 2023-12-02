import { ImageType } from '../../../types/miscTypes';
import { FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

type LightBoxProps = {
    image: ImageType | string | null;
    onClose: () => void;
};

export default function LightBox({ image, onClose }: LightBoxProps) {
    let src;
    // image is a URL to the image
    if (typeof image === 'string') {
        src = image;
    } else {
        // image is an image object
        src = `data:${image?.contentType};base64,${image?.data}`;
    }

    return (
        <motion.div
            key="lightBox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 z-50 w-screen h-screen bg-gray-800 bg-opacity-75 flex justify-center items-center"
        >
            <div className=" flex flex-col items-end justify-end">
                <motion.button
                    onClick={onClose}
                    whileTap={{ scale: 0.97 }}
                    className="relative -top-2 right-2 md:-right-8 bg-card dark:bg-cardDark hover:bg-red-500 text-red-500 hover:text-card rounded-full p-1 transition-colors duration-200"
                >
                    <FaTimes size="1.25em" />
                </motion.button>
                <img
                    className="max-w-full max-h-full"
                    src={src}
                    alt="Selected image"
                />
            </div>
        </motion.div>
    );
}
