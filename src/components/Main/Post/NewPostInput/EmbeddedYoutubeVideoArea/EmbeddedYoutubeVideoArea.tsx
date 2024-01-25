import { EmbeddedYoutubeVideo } from '../../PostItem/PostEmbeddedYoutubeVideoSection/EmbeddedYoutubeVideo/EmbeddedYoutubeVideo';
import { FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

type EmbeddedYoutubeVideoAreaProps = {
    setYoutubeID: React.Dispatch<React.SetStateAction<string | undefined>>;
    youtubeID: string;
};

/**
 * Component for rendering an area to preview and remove an embedded YouTube video.
 *
 * @component
 * @param {EmbeddedYoutubeVideoAreaProps} props - The props object.
 * @param {React.Dispatch<React.SetStateAction<string | undefined>>} props.setYoutubeID - Function to set the YouTube video ID.
 * @param {string} props.youtubeID - The YouTube video ID to be previewed.
 * @returns {JSX.Element} The rendered EmbeddedYoutubeVideoArea component.
 */
export default function EmbeddedYoutubeVideoArea({
    setYoutubeID,
    youtubeID,
}: EmbeddedYoutubeVideoAreaProps): JSX.Element {
    /**
     * The rendered EmbeddedYoutubeVideoArea component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="relative flex flex-col justify-center items-center text-xs h-auto w-full">
            <span>embedded youtube video preview: </span>
            <div className="w-full">
                <EmbeddedYoutubeVideo videoID={youtubeID} />
                <motion.button
                    onClick={() => {
                        setYoutubeID(undefined);
                    }}
                    whileTap={{ scale: 0.97 }}
                    className="absolute top-0 right-0 z-50 text-red-500 z-5"
                >
                    <FaTimes size="1.5em" />
                </motion.button>
            </div>
        </div>
    );
}
