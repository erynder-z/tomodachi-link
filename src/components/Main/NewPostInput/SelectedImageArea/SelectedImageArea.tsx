import React from 'react';
import { FaTimes } from 'react-icons/fa';

type SelectedImageAreaProps = {
    setSelectedImage: React.Dispatch<React.SetStateAction<File | undefined>>;
    selectedImage: File;
};

export default function SelectedImageArea({
    setSelectedImage,
    selectedImage,
}: SelectedImageAreaProps) {
    return (
        <div className="relative flex flex-col text-xs">
            <span>image preview: </span>
            <button
                onClick={() => {
                    setSelectedImage(undefined);
                }}
                className="absolute top-5 right-2 text-red-500 z-5"
            >
                <FaTimes size="1.5em" />
            </button>
            <img
                className=" object-cover mx-auto "
                src={
                    selectedImage
                        ? URL.createObjectURL(selectedImage)
                        : `data:image/png;base64,${selectedImage}`
                }
                alt="uploaded image"
            />
        </div>
    );
}
