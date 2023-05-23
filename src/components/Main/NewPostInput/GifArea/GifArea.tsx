import React from 'react';
import { TenorImage } from 'gif-picker-react';
import { FaTimes } from 'react-icons/fa';

type GifAreaProps = {
    setGif: React.Dispatch<React.SetStateAction<TenorImage | undefined>>;
    gif: TenorImage;
};

export default function GifArea({ setGif, gif }: GifAreaProps) {
    return (
        <div className="flex flex-col text-xs">
            <span>Gif preview: </span>
            <div className="relative flex justify-center">
                <button
                    onClick={() => {
                        setGif(undefined);
                    }}
                    className="absolute top-2 right-2 text-red-500 z-5"
                >
                    <FaTimes size="1.5em" />
                </button>
                <img
                    className="w-full h-auto object-cover shadow-lg"
                    src={gif.url}
                    alt="User uploaded gif"
                />
            </div>
        </div>
    );
}
