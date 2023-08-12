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
                <button
                    onClick={() => {
                        setSelectedImage(undefined);
                    }}
                    className="absolute top-0 right-0 text-red-500 z-5"
                >
                    <FaTimes size="1.5em" />
                </button>
            </div>
        </div>
    );
}
