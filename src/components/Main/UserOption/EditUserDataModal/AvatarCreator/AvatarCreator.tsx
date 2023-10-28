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

function AvatarCreator({
    image,
    setImage,
    handleConfirmImage,
    handleAvatarCreatorClose,
}: AvatarCreatorProps) {
    const editor = useRef<AvatarEditor | null>(null);
    const [scale, setScale] = useState(1);

    const handleConfirmButtonClick = async () => {
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

    async function createFileFromDataURL(
        dataurl: string,
        filename: string
    ): Promise<File> {
        const response = await fetch(dataurl);
        const blob = await response.blob();
        return new File([blob], filename, { type: blob.type });
    }

    const handleCloseButtonClick = () => handleAvatarCreatorClose();

    const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setScale(parseFloat(e.target.value));

    const CloseButton = (
        <motion.button
            onClick={handleCloseButtonClick}
            whileTap={{ scale: 0.97 }}
            className="absolute top-2 right-2 text-white"
        >
            <FaTimes />
        </motion.button>
    );

    const ScaleInput = (
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

    const ConfirmButton = (
        <motion.button
            onClick={handleConfirmButtonClick}
            whileTap={{ scale: 0.97 }}
            className="bg-blue-500 text-white px-2 py-1"
        >
            Confirm
        </motion.button>
    );

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden flex flex-col items-center justify-center gap-4 bg-black">
            {CloseButton}
            <h3 className="text-white">
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
