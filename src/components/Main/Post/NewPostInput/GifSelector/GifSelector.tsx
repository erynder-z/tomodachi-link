import React, { useEffect, useState } from 'react';
import GifPicker, { TenorImage } from 'gif-picker-react';
import { FaTimes } from 'react-icons/fa';
import useAuth from '../../../../../hooks/useAuth';
import { fetchTenorApiKey } from '../../../../../utilities/fetchTenorApiKEy';

type GifSelectorProps = {
    setShowGifSelector: React.Dispatch<React.SetStateAction<boolean>>;
    setGif: React.Dispatch<React.SetStateAction<TenorImage | undefined>>;
};

export default function GifSelector({
    setShowGifSelector,
    setGif,
}: GifSelectorProps) {
    const { token } = useAuth();
    const [apiKey, setApiKey] = useState<string | undefined>(undefined);

    const handleComponentClose = () => {
        setShowGifSelector(false);
    };

    useEffect(() => {
        fetchTenorApiKey(token, setApiKey);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden  flex flex-col items-center justify-center gap-4 transition-opacity bg-gray-800/80">
            <div className="relative">
                <button
                    onClick={handleComponentClose}
                    className="absolute -top-8 -right-0 md:-right-10 bg-card hover:bg-red-500 text-red-500 hover:text-card rounded-full p-1 transition-colors duration-200"
                >
                    <FaTimes size="1.5em" />
                </button>
                {apiKey && (
                    <GifPicker
                        tenorApiKey={`${apiKey}`}
                        onGifClick={(gif: TenorImage) => {
                            setGif(gif);
                            setShowGifSelector(false);
                        }}
                    />
                )}
            </div>
            ;
        </div>
    );
}
