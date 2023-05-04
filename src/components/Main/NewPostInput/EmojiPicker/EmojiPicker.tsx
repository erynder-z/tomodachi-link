import React from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

type EmojiPickerProps = {
    setNewPostText: React.Dispatch<React.SetStateAction<string>>;
    setShowEmojiPicker: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EmojiPicker({
    setNewPostText,
    setShowEmojiPicker,
}: EmojiPickerProps) {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden  flex flex-col items-center justify-center gap-4 transition-opacity bg-gray-800/80">
            <Picker
                data={data}
                theme={'dark'}
                onEmojiSelect={(emoji: any) => {
                    setNewPostText((prev) => prev + emoji.native);
                    setShowEmojiPicker(false);
                }}
                onClickOutside={() => {
                    setShowEmojiPicker(false);
                }}
            />
        </div>
    );
}
