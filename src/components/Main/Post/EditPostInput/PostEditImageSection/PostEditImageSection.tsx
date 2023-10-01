import { FaTimes } from 'react-icons/fa';

type PostEditImageSectionProps = {
    convertedImage: string;
    handleImageDelete: () => void;
};

export default function PostEditImageSection({
    convertedImage,
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
                src={`data:image/png;base64,${convertedImage}`}
                alt="User uploaded image"
            />
            <button
                onClick={(e) => {
                    handleRemoveButtonClick(e);
                }}
                className="absolute top-0 right-0 text-red-500 z-5"
            >
                <FaTimes size="1.25rem" />
            </button>
        </div>
    );
}
