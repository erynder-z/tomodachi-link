import { FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

type PostEditImageSectionProps = {
    dbImage: string;
    handleImageDelete: () => void;
};

export default function PostEditImageSection({
    dbImage,
    handleImageDelete,
}: PostEditImageSectionProps) {
    const handleRemoveButtonClick = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        handleImageDelete();
    };
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
