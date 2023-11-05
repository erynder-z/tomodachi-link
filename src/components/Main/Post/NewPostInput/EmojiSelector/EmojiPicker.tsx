import { FaTimes } from 'react-icons/fa';
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';
import useTheme from '../../../../../hooks/useTheme';
import { motion } from 'framer-motion';

type EmojiSelectorProps = {
    setText: React.Dispatch<React.SetStateAction<string>>;
    setShowEmojiPicker: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EmojiSelector({
    setText,
    setShowEmojiPicker,
}: EmojiSelectorProps) {
    const { colorScheme } = useTheme();
    const handleComponentClose = () => {
        setShowEmojiPicker(false);
    };

    const getThemeVariable = () =>
        colorScheme === 'dark' ? Theme.DARK : Theme.LIGHT;

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
                <EmojiPicker
                    colorScheme={getThemeVariable()}
                    onEmojiClick={(emojiData: EmojiClickData) => {
                        setText((prev) => prev + emojiData.emoji);
                        setShowEmojiPicker(false);
                    }}
                />
            </div>
        </div>
    );
}
