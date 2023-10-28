import { TenorImage } from 'gif-picker-react';
import { FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

type GifAreaProps = {
    setGif: React.Dispatch<React.SetStateAction<TenorImage | undefined>>;
    gif: TenorImage;
};

export default function GifArea({ setGif, gif }: GifAreaProps) {
    const CloseButton = (
        <motion.button
            onClick={() => {
                setGif(undefined);
            }}
            whileTap={{ scale: 0.97 }}
            className="absolute top-0 right-0 text-red-500 z-5"
        >
            <FaTimes size="1.5em" />
        </motion.button>
    );
    return (
        <div className="flex flex-col text-xs">
            <span>Gif preview: </span>
            <div className="relative flex justify-center">
                {CloseButton}
                <img
                    className="max-h-20 md:max-h-60 object-cover shadow-lg"
                    src={gif.url}
                    alt="User uploaded gif"
                />
            </div>
        </div>
    );
}
