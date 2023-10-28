import { FaTimes } from 'react-icons/fa';
import { EmbeddedYoutubeVideo } from '../../PostItem/PostEmbeddedYoutubeVideoSection/EmbeddedYoutubeVideo/EmbeddedYoutubeVideo';
import { motion } from 'framer-motion';

type PostEditEmbeddedYoutubeVideoProps = {
    dbEmbeddedVideoID: string;
    handleVideoDelete: () => void;
};

export default function PostEditEmbeddedYoutubeVideo({
    dbEmbeddedVideoID,
    handleVideoDelete,
}: PostEditEmbeddedYoutubeVideoProps) {
    const handleRemoveButtonClick = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        handleVideoDelete();
    };
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
