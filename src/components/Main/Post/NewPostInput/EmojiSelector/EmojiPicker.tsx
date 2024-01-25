import { FaTimes } from 'react-icons/fa';
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';
import useTheme from '../../../../../hooks/useTheme';
import { motion } from 'framer-motion';

type EmojiSelectorProps = {
    setText: React.Dispatch<React.SetStateAction<string>>;
    setShowEmojiPicker: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * Component for selecting emojis from an emoji picker.
 *
 * @component
 * @param {EmojiSelectorProps} props - The props object.
 * @param {React.Dispatch<React.SetStateAction<string>>} props.setText - Function to set the text with the selected emoji.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setShowEmojiPicker - Function to set the visibility of the emoji picker.
 * @returns {JSX.Element} The rendered EmojiSelector component.
 */
export default function EmojiSelector({
    setText,
    setShowEmojiPicker,
}: EmojiSelectorProps): JSX.Element {
    const { colorScheme } = useTheme();

    /**
     * Function to close the emoji picker component.
     *
     * @function
     * @returns {void}
     */
    const handleComponentClose = (): void => {
        setShowEmojiPicker(false);
    };

    /**
     * Function to get the emoji picker theme based on the color scheme.
     *
     * @function
     * @returns {Theme} The emoji picker theme (Theme.DARK or Theme.LIGHT).
     */
    const getThemeVariable = (): Theme =>
        colorScheme === 'dark' ? Theme.DARK : Theme.LIGHT;

    /**
     * Emoji picker close button component.
     *
     * @constant
     * @type {JSX.Element}
     */
    const CloseButton: JSX.Element = (
        <motion.button
            onClick={handleComponentClose}
            whileTap={{ scale: 0.97 }}
            className="absolute -top-8 -right-0 md:-right-10 bg-card dark:bg-cardDark hover:bg-red-500 text-red-500 hover:text-card rounded-full p-1 transition-colors duration-200"
        >
            <FaTimes size="1.5em" />
        </motion.button>
    );

    /**
     * The rendered EmojiSelector component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden  flex flex-col items-center justify-center gap-4 transition-opacity bg-gray-800/80">
            <div className="relative">
                {CloseButton}
                <EmojiPicker
                    theme={getThemeVariable()}
                    onEmojiClick={(emojiData: EmojiClickData) => {
                        setText((prev) => prev + emojiData.emoji);
                        setShowEmojiPicker(false);
                    }}
                />
            </div>
        </div>
    );
}
