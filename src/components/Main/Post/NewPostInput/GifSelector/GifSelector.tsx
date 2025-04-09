import { FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import useEscapeKey from '../../../../../hooks/useEscapeKeyToHandleAction';
import GiphySearch from './GiphySearch/GiphySearch';
import { GiphyGif } from '../../../../../types/miscTypes';

type GifSelectorProps = {
    setShowGifSelector: React.Dispatch<React.SetStateAction<boolean>>;
    setGif: React.Dispatch<React.SetStateAction<GiphyGif | undefined>>;
};

/**
 * Component for selecting and displaying GIFs using the GifPicker library.
 *
 * @component
 * @param {GifSelectorProps} props - The props object.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setShowGifSelector - Function to control the visibility of the GIF selector.
 * @param {React.Dispatch<React.SetStateAction<GiphyGif | undefined>>} props.setGif - Function to set the selected GIF.
 * @returns {JSX.Element} The rendered GifSelector component.
 */
export default function GifSelector({
    setShowGifSelector,
    setGif,
}: GifSelectorProps): JSX.Element {
    /**
     * Function to close the GIF selector component.
     *
     * @function
     * @returns {void}
     */
    const handleComponentClose = (): void => setShowGifSelector(false);

    /**
     * Custom hook to close the overlay when pressing ESC
     *
     */
    useEscapeKey(handleComponentClose);

    /**
     * Close button component for the GIF selector.
     *
     * @constant
     * @type {JSX.Element}
     */
    const CloseButton: JSX.Element = (
        <motion.button
            onClick={handleComponentClose}
            whileTap={{ scale: 0.97 }}
            className="absolute -top-8 -right-0 md:-right-10 bg-card dark:bg-cardDark hover:bg-red-500 text-red-500 hover:text-card rounded-full p-1 transition-colors duration-200"
        >
            <FaTimes size="1.5em" />
        </motion.button>
    );

    /**
     * The rendered GifSelector component.
     *
     * @type {JSX.Element}
     */
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            viewport={{ once: true }}
            className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden  flex flex-col items-center justify-center gap-4 transition-opacity bg-gray-800/80"
        >
            <div className="relative">
                {CloseButton}

                <GiphySearch
                    onGifClick={(gif: GiphyGif) => {
                        setGif(gif);
                        setShowGifSelector(false);
                    }}
                    gridHeight="35ch"
                />
            </div>
        </motion.div>
    );
}
