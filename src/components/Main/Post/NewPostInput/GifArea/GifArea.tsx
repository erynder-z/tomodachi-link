import { FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { GiphyGif } from '../../../../../types/miscTypes';

type GifAreaProps = {
    setGif: React.Dispatch<React.SetStateAction<GiphyGif | undefined>>;
    gif: GiphyGif;
};

/**
 * Component for displaying a preview of a selected GIF.
 *
 * @component
 * @param {GifAreaProps} props - The props object.
 * @param {React.Dispatch<React.SetStateAction<GiphyGif | undefined>>} props.setGif - Function to set the selected GIF.
 * @param {GiphyGif} props.gif - The selected GIF object.
 * @returns {JSX.Element} The rendered GifArea component.
 */
export default function GifArea({ setGif, gif }: GifAreaProps): JSX.Element {
    /**
     * Close button component for the GIF area.
     *
     * @constant
     * @type {JSX.Element}
     */
    const CloseButton: JSX.Element = (
        <motion.button
            onClick={() => {
                setGif(undefined);
            }}
            whileTap={{ scale: 0.97 }}
            className="absolute top-0 right-0 text-red-500 z-5"
        >
            <FaTimes size="1.5em" />
        </motion.button>
    );

    /**
     * The rendered GifArea component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="flex flex-col text-xs">
            <span>Gif preview: </span>
            <div className="relative flex justify-center">
                {CloseButton}
                <img
                    className="max-h-20 md:max-h-60 object-cover shadow-lg"
                    src={gif.images?.fixed_width?.url}
                    alt="User uploaded gif"
                />
            </div>
        </div>
    );
}
