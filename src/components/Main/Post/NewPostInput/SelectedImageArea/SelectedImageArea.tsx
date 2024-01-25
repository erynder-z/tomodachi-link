import { FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

type SelectedImageAreaProps = {
    setSelectedImage: React.Dispatch<React.SetStateAction<File | undefined>>;
    selectedImage: File;
};

/**
 * Component for rendering a preview of the selected image.
 *
 * @component
 * @param {SelectedImageAreaProps} props - The props object.
 * @param {React.Dispatch<React.SetStateAction<File | undefined>>} props.setSelectedImage - The callback function to set the selected image state.
 * @param {File} props.selectedImage - The selected image file.
 * @returns {JSX.Element} The rendered SelectedImageArea component.
 */
export default function SelectedImageArea({
    setSelectedImage,
    selectedImage,
}: SelectedImageAreaProps): JSX.Element {
    /**
     * The rendered SelectedImageArea component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="flex flex-col justify-center items-center text-xs">
            <span>image preview: </span>
            <div className="relative flex justify-center items-center w-full">
                <img
                    className="max-h-20 md:max-h-60 max-w-3/4 object-cover "
                    src={
                        selectedImage
                            ? URL.createObjectURL(selectedImage)
                            : `data:image/png;base64,${selectedImage}`
                    }
                    alt="uploaded image"
                />
                <motion.button
                    onClick={() => {
                        setSelectedImage(undefined);
                    }}
                    whileTap={{ scale: 0.97 }}
                    className="absolute top-0 right-0 text-red-500 z-5"
                >
                    <FaTimes size="1.5em" />
                </motion.button>
            </div>
        </div>
    );
}
