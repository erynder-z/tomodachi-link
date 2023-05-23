import React from 'react';
import { ImageType } from '../../../../types/imageType';

type PostImageSectionProps = {
    handleImageClick: (image: ImageType) => void;
    databaseImage: ImageType;
    convertedImage: string;
};

export default function PostImageSection({
    handleImageClick,
    databaseImage,
    convertedImage,
}: PostImageSectionProps) {
    return (
        <div className="flex justify-center">
            <img
                onClick={() => handleImageClick(databaseImage)}
                className="w-fit h-auto object-cover shadow-lg cursor-pointer"
                src={`data:image/png;base64,${convertedImage}`}
                alt="User uploaded image"
            />
        </div>
    );
}