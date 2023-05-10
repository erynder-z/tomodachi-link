import React from 'react';
import { FaTimes } from 'react-icons/fa';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

type EmojiSelectorProps = {
    setNewPostText: React.Dispatch<React.SetStateAction<string>>;
    setShowEmojiPicker: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EmojiSelector({
    setNewPostText,
    setShowEmojiPicker,
}: EmojiSelectorProps) {
    const handleComponentClose = () => {
        setShowEmojiPicker(false);
    };

    const handlePickerClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

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
            <div onClick={handlePickerClick}>
                <EmojiPicker
                    onEmojiClick={(emojiData: EmojiClickData) => {
                        setNewPostText((prev) => prev + emojiData.emoji);
                        setShowEmojiPicker(false);
                    }}
                />
            </div>
        </div>
    );
}
