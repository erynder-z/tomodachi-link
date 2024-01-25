import { FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

type PostEditGifSectionProps = {
    dbGif: string;
    handleGifDelete: () => void;
};

/**
 * Component for displaying and editing a GIF in a post.
 *
 * @component
 * @param {PostEditGifSectionProps} props - The props object.
 * @param {string} props.dbGif - The URL or data of the GIF stored in the database.
 * @param {() => void} props.handleGifDelete - Function to handle the deletion of the GIF.
 * @returns {JSX.Element} The rendered PostEditGifSection component.
 */
export default function PostEditGifSection({
    dbGif,
    handleGifDelete,
}: PostEditGifSectionProps): JSX.Element {
    /**
     * Handles the click event on the remove button to delete the GIF.
     *
     * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} e - The click event.
     * @return {void} No return value.
     */
    const handleRemoveButtonClick = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): void => {
        e.preventDefault();
        handleGifDelete();
    };

    /**
     * The rendered PostEditGifSection component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="relative flex justify-center w-full">
            <img
                className="max-h-20 md:max-h-none max-w-3/4 object-contain shadow-lg cursor-pointer"
                src={dbGif}
                alt="User uploaded gif"
            />
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
