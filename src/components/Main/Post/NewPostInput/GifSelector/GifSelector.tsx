import { useEffect, useRef, useState } from 'react';
import GifPicker, { TenorImage, Theme } from 'gif-picker-react';
import { FaTimes } from 'react-icons/fa';
import useAuth from '../../../../../hooks/useAuth';
import { fetchTenorApiKey } from '../../../../../utilities/fetchTenorApiKey';
import useTheme from '../../../../../hooks/useTheme';
import { motion } from 'framer-motion';

type GifSelectorProps = {
    setShowGifSelector: React.Dispatch<React.SetStateAction<boolean>>;
    setGif: React.Dispatch<React.SetStateAction<TenorImage | undefined>>;
};

export default function GifSelector({
    setShowGifSelector,
    setGif,
}: GifSelectorProps) {
    const { token } = useAuth();
    const { colorScheme } = useTheme();
    const [apiKey, setApiKey] = useState<string | undefined>(undefined);

    const shouldFetchAPIKey = useRef(true);

    const handleComponentClose = () => setShowGifSelector(false);

    const getThemeVariable = () =>
        colorScheme === 'dark' ? Theme.DARK : Theme.LIGHT;

    useEffect(() => {
        if (shouldFetchAPIKey.current) fetchTenorApiKey(token, setApiKey);
        return () => {
            shouldFetchAPIKey.current = false;
        };
    }, []);

    const CloseButton = (
        <motion.button
            onClick={handleComponentClose}
            whileTap={{ scale: 0.97 }}
            className="absolute -top-8 -right-0 md:-right-10 bg-card dark:bg-cardDark hover:bg-red-500 text-red-500 hover:text-card rounded-full p-1 transition-colors duration-200"
        >
            <FaTimes size="1.5em" />
        </motion.button>
    );

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden  flex flex-col items-center justify-center gap-4 transition-opacity bg-gray-800/80">
            <div className="relative">
                {CloseButton}
                {apiKey && (
                    <GifPicker
                        tenorApiKey={`${apiKey}`}
                        colorScheme={getThemeVariable()}
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
