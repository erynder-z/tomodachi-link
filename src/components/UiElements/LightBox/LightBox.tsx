import { ImageType } from '../../../types/miscTypes';
import { convertDatabaseImageToBase64 } from '../../../utilities/convertDatabaseImageToBase64';
import { FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

type LightBoxProps = {
    image: ImageType | string | null;
    onClose: () => void;
};

export default function LightBox({ image, onClose }: LightBoxProps) {
    let src = '';

    if (typeof image === 'string') {
        src = image;
    } else if (image instanceof ArrayBuffer) {
        src = URL.createObjectURL(new Blob([image]));
    } else if (image && image.data && image.contentType) {
        src = `data:${image.contentType};base64,${convertDatabaseImageToBase64(
            image
        )}`;
    }

    return (
        <motion.div
            key="lightBox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 z-50 w-screen h-screen bg-gray-800 bg-opacity-75 flex justify-center items-center"
        >
            {src && (
                <img
                    className="max-w-full max-h-full"
                    src={src}
                    alt="Selected image"
                />
            )}
            <button
                className="absolute top-0 right-0 m-4 text-regularTextDark font-bold text-lg"
                onClick={onClose}
            >
                <FaTimes />
            </button>
        </motion.div>
    );
}
