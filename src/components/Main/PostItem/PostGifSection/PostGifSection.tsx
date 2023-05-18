import React from 'react';

type PostGifSectionProps = {
    handleGifClick: (gifURL: string) => void;
    gifUrl: string;
};

export default function PostGifSection({
    handleGifClick,
    gifUrl,
}: PostGifSectionProps) {
    return (
        <div className="flex justify-center">
            <img
                onClick={() => handleGifClick(gifUrl)}
                className="w-fit h-auto object-cover shadow-lg cursor-pointer"
                src={gifUrl}
                alt="User uploaded gif"
            />
        </div>
    );
}
