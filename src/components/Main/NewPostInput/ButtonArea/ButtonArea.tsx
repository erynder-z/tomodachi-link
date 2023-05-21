import React from 'react';
import { FaRegSmileBeam, FaRegImage, FaYoutube } from 'react-icons/fa';
import { MdSend } from 'react-icons/md';
import { TbGif } from 'react-icons/tb';

type ButtonAreaProps = {
    handleImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setShowYoutubeEmbed: React.Dispatch<React.SetStateAction<boolean>>;
    showYoutubeEmbed: boolean;
    setShowGifSelector: React.Dispatch<React.SetStateAction<boolean>>;
    showGifSelector: boolean;
    setShowEmojiPicker: React.Dispatch<React.SetStateAction<boolean>>;
    showEmojiPicker: boolean;
    postText: string;
};

export default function ButtonArea({
    handleImageSelect,
    setShowYoutubeEmbed,
    showYoutubeEmbed,
    setShowGifSelector,
    showGifSelector,
    setShowEmojiPicker,
    showEmojiPicker,
    postText,
}: ButtonAreaProps) {
    return (
        <div className="flex w-full gap-4">
            <label className="flex items-center cursor-pointer">
                <input
                    type="file"
                    name="imagePicker"
                    accept="image/jpeg, image/png, image/webp"
                    className="hidden"
                    onChange={handleImageSelect}
                />
                <FaRegImage className="text-back hover:text-blue-500" />
            </label>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowYoutubeEmbed(!showYoutubeEmbed);
                }}
                className="text-back hover:text-blue-500"
            >
                <FaYoutube />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowGifSelector(!showGifSelector);
                }}
                className="text-back hover:text-blue-500"
            >
                <TbGif />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowEmojiPicker(!showEmojiPicker);
                }}
                className="text-back hover:text-blue-500"
            >
                <FaRegSmileBeam />
            </button>
            <button
                className={`flex items-center justify-center h-8 w-8 text-white ml-auto text-sm ${
                    !postText
                        ? 'bg-gray-500 hover:bg-gray-600'
                        : 'bg-blue-500 hover:bg-blue-600'
                }`}
                title={postText ? undefined : 'Please enter a message'}
            >
                <MdSend />
            </button>
        </div>
    );
}
