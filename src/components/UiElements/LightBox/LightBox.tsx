import { ImageType } from '../../../types/miscTypes';
import { FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

type LightBoxProps = {
    image: ImageType | string | null;
    onClose: () => void;
};

/**
 * React component for displaying an image in a lightbox.
 *
 * @component
 * @param {LightBoxProps} props - The component props.
 * @param {ImageType | string | null} props.image - The image to display in the lightbox. It can be a URL or an image object.
 * @param {() => void} props.onClose - Callback function to handle the lightbox close event.
 * @returns {JSX.Element} The rendered LightBox component.
 */
export default function LightBox({
    image,
    onClose,
}: LightBoxProps): JSX.Element {
    let src;
    // image is a URL to the image
    if (typeof image === 'string') {
        src = image;
    } else {
        // image is an image object
        src = `data:${image?.contentType};base64,${image?.data}`;
    }

    /**
     * Render the LightBox component.
     *
     * @type {JSX.Element}
     */
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
