import { FaTimes } from 'react-icons/fa';
import { EmbeddedYoutubeVideo } from '../../PostItem/PostEmbeddedYoutubeVideoSection/EmbeddedYoutubeVideo/EmbeddedYoutubeVideo';
import { motion } from 'framer-motion';

type PostEditEmbeddedYoutubeVideoProps = {
    dbEmbeddedVideoID: string;
    handleVideoDelete: () => void;
};

/**
 * Component for displaying and editing an embedded YouTube video in a post.
 *
 * @component
 * @param {PostEditEmbeddedYoutubeVideoProps} props - The props object.
 * @param {string} props.dbEmbeddedVideoID - The ID of the embedded YouTube video in the database.
 * @param {() => void} props.handleVideoDelete - Function to handle the deletion of the embedded YouTube video.
 * @returns {JSX.Element} The rendered PostEditEmbeddedYoutubeVideo component.
 */
export default function PostEditEmbeddedYoutubeVideo({
    dbEmbeddedVideoID,
    handleVideoDelete,
}: PostEditEmbeddedYoutubeVideoProps): JSX.Element {
    /**
     * Handles the click event on the remove button to delete the embedded YouTube video.
     *
     * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} e - The click event.
     * @return {void} No return value.
     */
    const handleRemoveButtonClick = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): void => {
        e.preventDefault();
        handleVideoDelete();
    };

    /**
     * The rendered PostEditEmbeddedYoutubeVideo component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="relative flex flex-col justify-center items-center text-xs h-auto w-full">
            <EmbeddedYoutubeVideo videoID={dbEmbeddedVideoID} />
            <motion.button
                onClick={(e) => {
                    handleRemoveButtonClick(e);
                }}
                whileTap={{ scale: 0.97 }}
                className="absolute top-0 right-0 text-red-500 z-5"
            >
                <FaTimes size="1.25rem" />
            </motion.button>
        </div>
    );
}
