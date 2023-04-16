import React, { useEffect, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { FaTimes } from 'react-icons/fa';
import resizeFile from '../../../../utilities/ImageResizer';

type Props = {
    image: File;
    setImage: React.Dispatch<
        React.SetStateAction<{
            selectedFile: File | null;
            preview: string;
        }>
    >;
    handleConfirmImage: () => void;
};

function AvatarCreator({ image, setImage, handleConfirmImage }: Props) {
    const editor = useRef<AvatarEditor | null>(null);
    const [avatarDimensions, setAvatarDimensions] = useState({
        height: 0,
        width: 0,
    });

    useEffect(() => {
        if (window.innerWidth < 768) {
            setAvatarDimensions({ height: 100, width: 100 });
        } else {
            setAvatarDimensions({ height: 250, width: 250 });
        }
    }, []);

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

    const handleCloseButtonClick = () => {
        handleConfirmImage();
    };

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden flex flex-col items-center justify-center bg-black">
            <button
                onClick={handleCloseButtonClick}
                className="absolute top-2 right-2 text-white"
            >
                <FaTimes />
            </button>
            <h3 className="text-white">position your avatar</h3>
            <AvatarEditor
                ref={editor}
                image={image}
                width={avatarDimensions.width}
                height={avatarDimensions.height}
                border={0}
                borderRadius={125}
                color={[0, 0, 0, 1.0]}
                scale={1}
                rotate={0}
            />
            <div className="flex w-full">
                <button
                    onClick={handleConfirmButtonClick}
                    className="w-full bg-blue-500 text-white rounded-md px-2 py-1"
                >
                    Confirm
                </button>
            </div>
        </div>
    );
}

export default AvatarCreator;
