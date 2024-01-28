import { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { FaTimes } from 'react-icons/fa';
import resizeFile from '../../../../../utilities/ImageResizer';
import { motion } from 'framer-motion';

type AvatarCreatorProps = {
    image: File;
    setImage: React.Dispatch<
        React.SetStateAction<{
            selectedFile: File | null;
            preview: string;
        }>
    >;
    handleConfirmImage: () => void;
    handleAvatarCreatorClose: () => void;
};

/**
 * React component for creating and editing avatars.
 *
 * @component
 * @param {AvatarCreatorProps} props - The component props.
 * @returns {JSX.Element} The rendered AvatarCreator component.
 */
function AvatarCreator({
    image,
    setImage,
    handleConfirmImage,
    handleAvatarCreatorClose,
}: AvatarCreatorProps): JSX.Element {
    const editor = useRef<AvatarEditor | null>(null);
    const [scale, setScale] = useState(1);

    /**
     * Handles the click event of the confirm button.
     *
     * @function
     * @async
     * @returns {Promise<void>} A promise that resolves after handling the event.
     */
    const handleConfirmButtonClick = async (): Promise<void> => {
        if (editor.current != null) {
            const canvasDataUrl = editor.current
                ?.getImageScaledToCanvas()
                ?.toDataURL();
            if (canvasDataUrl != null) {
                const resizedFile = await resizeFile(
                    await createFileFromDataURL(canvasDataUrl, 'avatar')
                );
                setImage({
                    selectedFile: resizedFile as File,
                    preview: canvasDataUrl,
                });
                handleConfirmImage();
            }
        }
    };

    /**
     * Creates a file from a data URL.
     *
     * @function
     * @async
     * @param {string} dataurl - The data URL.
     * @param {string} filename - The filename for the created file.
     * @returns {Promise<File>} A promise that resolves with the created file.
     */
    async function createFileFromDataURL(
        dataurl: string,
        filename: string
    ): Promise<File> {
        const response = await fetch(dataurl);
        const blob = await response.blob();
        return new File([blob], filename, { type: blob.type });
    }

    /**
     * Handles the click event of the close button.
     *
     * @function
     * @returns {void}
     */
    const handleCloseButtonClick = (): void => handleAvatarCreatorClose();

    /**
     * Handles the change event of the scale input.
     *
     * @function
     * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
     * @returns {void}
     */
    const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
        setScale(parseFloat(e.target.value));

    /**
     * JSX element for the close button.
     *
     * @type {JSX.Element}
     */
    const CloseButton: JSX.Element = (
        <motion.button
            onClick={handleCloseButtonClick}
            whileTap={{ scale: 0.97 }}
            className="relative  -right-28 md:-right-48 bg-card dark:bg-cardDark hover:bg-red-500 text-red-500 hover:text-card rounded-full p-1 transition-colors duration-200"
        >
            <FaTimes size="1.25em" />
        </motion.button>
    );

    /**
     * JSX element for the scale input.
     *
     * @type {JSX.Element}
     */
    const ScaleInput: JSX.Element = (
        <div className="flex flex-col">
            <label htmlFor="scale" className="text-white">
                Adjust scale:
            </label>
            <input
                type="range"
                min="1"
                max="2"
                step="0.1"
                value={scale}
                onChange={handleScaleChange}
                id="scale"
            />
        </div>
    );

    /**
     * JSX element for the confirm button.
     *
     * @type {JSX.Element}
     */
    const ConfirmButton: JSX.Element = (
        <motion.button
            onClick={handleConfirmButtonClick}
            whileTap={{ scale: 0.97 }}
            className="bg-blue-500 text-white px-2 py-1"
        >
            Confirm
        </motion.button>
    );

    /**
     * JSX element for the AvatarCreator component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden flex flex-col items-center justify-center gap-4 bg-black">
            {CloseButton}
            <h3 className="text-white text-sm md:text-base">
                Grab the image to position your avatar
            </h3>
            <AvatarEditor
                ref={editor}
                image={image}
                width={250}
                height={250}
                border={0}
                borderRadius={125}
                color={[0, 0, 0, 1.0]}
                scale={scale}
                rotate={0}
            />
            {ScaleInput}
            {ConfirmButton}
        </div>
    );
}

export default AvatarCreator;
