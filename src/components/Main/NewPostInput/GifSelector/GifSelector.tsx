import React, { useEffect, useState } from 'react';
import GifPicker, { TenorImage } from 'gif-picker-react';
import { FaTimes } from 'react-icons/fa';
import useAuth from '../../../../hooks/useAuth';
import { fetchTenorApiKey } from '../../../../utilities/fetchTenorApiKEy';

type GifSelectorProps = {
    setShowGifSelector: React.Dispatch<React.SetStateAction<boolean>>;
    setGif: React.Dispatch<React.SetStateAction<TenorImage | null>>;
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

    const handlePickerClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    useEffect(() => {
        fetchTenorApiKey(token, setApiKey);
    }, []);

    return (
        <div
            onClick={handleComponentClose}
            className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden  flex flex-col items-center justify-center gap-4 transition-opacity bg-gray-800/80"
        >
            <button
                onClick={handleComponentClose}
                className="absolute top-2 right-2 text-white"
            >
                <FaTimes />
            </button>
            {apiKey && (
                <div onClick={handlePickerClick}>
                    <GifPicker
                        tenorApiKey={`${apiKey}`}
                        onGifClick={(gif: TenorImage) => {
                            setGif(gif);
                            setShowGifSelector(false);
                        }}
                    />
                </div>
            )}
            ;
        </div>
    );
}
