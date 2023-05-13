import { ImageType } from '../../../types/imageType';
import { convertImageToBase64 } from '../../../utilities/convertImageToBase64';
import { FaTimes } from 'react-icons/fa';

type LightBoxProps = {
    image: ImageType | null;
    onClose: () => void;
};

export default function LightBox({ image, onClose }: LightBoxProps) {
    const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
        event.stopPropagation();
    };

    return (
        <div
            onClick={onClose}
            className="fixed top-0 left-0 z-50 w-screen h-screen bg-gray-800 bg-opacity-75 flex justify-center items-center"
        >
            {image && (
                <img
                    onClick={handleImageClick}
                    className="max-w-full max-h-full"
                    src={`data:image/png;base64,${convertImageToBase64(image)}`}
                    alt="Selected image"
                />
            )}
            <button
                className="absolute top-0 right-0 m-4 text-white font-bold text-lg"
                onClick={onClose}
            >
                <FaTimes />
            </button>
        </div>
    );
}
