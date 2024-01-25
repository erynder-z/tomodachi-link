import { FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

type PostEditImageSectionProps = {
    dbImage: string;
    handleImageDelete: () => void;
};

/**
 * Component for displaying and editing an image in a post.
 *
 * @component
 * @param {PostEditImageSectionProps} props - The props object.
 * @param {string} props.dbImage - The base64-encoded image data stored in the database.
 * @param {() => void} props.handleImageDelete - Function to handle the deletion of the image.
 * @returns {JSX.Element} The rendered PostEditImageSection component.
 */
export default function PostEditImageSection({
    dbImage,
    handleImageDelete,
}: PostEditImageSectionProps): JSX.Element {
    /**
     * Handles the click event on the remove button to delete the image.
     * @function
     * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} e - The click event.
     * @return {void} No return value.
     */
    const handleRemoveButtonClick = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): void => {
        e.preventDefault();
        handleImageDelete();
    };

    /**
     * The rendered PostEditImageSection component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="relative flex justify-center">
            <img
                className="max-h-20 md:max-h-none object-contain shadow-lg cursor-pointer"
                src={`data:image/png;base64,${dbImage}`}
                alt="User uploaded image"
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
