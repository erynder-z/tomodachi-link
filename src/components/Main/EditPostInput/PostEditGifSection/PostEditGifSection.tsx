import React from 'react';
import { FaTimes } from 'react-icons/fa';

type PostEditGifSectionProps = {
    gifUrl: string;
    handleGifDelete: () => void;
};

export default function PostEditGifSection({
    gifUrl,
    handleGifDelete,
}: PostEditGifSectionProps) {
    const handleRemoveButtonClick = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        handleGifDelete();
    };
    return (
        <div className="relative flex justify-center">
            <img
                className="max-h-20 md:max-h-none object-contain shadow-lg cursor-pointer"
                src={gifUrl}
                alt="User uploaded gif"
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
