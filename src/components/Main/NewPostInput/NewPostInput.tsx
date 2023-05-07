import React, { useState } from 'react';
import useCurrentUserData from '../../../hooks/useCurrentUserData';
import useAuth from '../../../hooks/useAuth';
import useInfoCard from '../../../hooks/useInfoCard';
import {
    FaExclamationTriangle,
    FaRegSmile,
    FaRegSmileBeam,
    FaRegImage,
} from 'react-icons/fa';
import { MdSend } from 'react-icons/md';
import EmojiPicker from './EmojiPicker/EmojiPicker';
import resizeFile from '../../../utilities/ImageResizer';

type NewPostInputProps = {
    onPostSuccess: () => void;
};

export default function NewPostInput({ onPostSuccess }: NewPostInputProps) {
    const { token } = useAuth();
    const { setInfo } = useInfoCard();
    const { currentUserData } = useCurrentUserData();
    const { username } = currentUserData || {};

    const [newPostText, setNewPostText] = useState<string>('');
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleNewPostChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setNewPostText(event.target.value);
    };

    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedImage(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (token) {
            const formData = new FormData();
            formData.append('newPost', newPostText);
            if (selectedImage) {
                const resizedFile = await resizeFile(selectedImage);
                selectedImage &&
                    formData.append('imagePicker', resizedFile as File);
            }

            const serverURL = import.meta.env.VITE_SERVER_URL;
            const response = await fetch(`${serverURL}/api/v1/post`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
            if (response.ok) {
                setInfo({
                    typeOfInfo: 'good',
                    message: 'Post created successfully!',
                    icon: <FaRegSmile />,
                });
                setNewPostText('');
                setSelectedImage(null);
                onPostSuccess();
            } else {
                const data = await response.json();
                const errorMessages = data.errors;
                const message = errorMessages
                    .map((error: { msg: string }) => error.msg)
                    .join(', ');

                setInfo({
                    typeOfInfo: 'bad',
                    message: message,
                    icon: <FaExclamationTriangle />,
                });

                throw new Error(
                    `Error: ${response.status} ${response.statusText}`
                );
            }
        }
    };

    return (
        <div className="flex gap-4 md:p-4 lg:w-full lg:flex-row lg:justify-around lg:shadow-lg bg-card">
            <form
                action=""
                method="POST"
                onSubmit={handleSubmit}
                className="flex w-full divide-gray-200"
            >
                <div className="relative w-full text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                        <textarea
                            rows={3}
                            required
                            autoComplete="off"
                            id="newPost"
                            name="newPost"
                            className="peer placeholder-transparent w-full bg-blue-100 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 p-4"
                            placeholder="message"
                            value={newPostText}
                            onChange={handleNewPostChange}
                        />
                        <label
                            htmlFor="newPost"
                            className="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm px-2"
                        >
                            what's on your mind, {username}?
                        </label>
                    </div>
                    {selectedImage && (
                        <div className="flex flex-col text-xs">
                            <span>image preview: </span>
                            <img
                                className=" object-cover mx-auto "
                                src={
                                    selectedImage
                                        ? URL.createObjectURL(selectedImage)
                                        : `data:image/png;base64,${selectedImage}`
                                }
                                alt="uploaded image"
                            />
                        </div>
                    )}
                    <div className="flex w-full gap-4">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="file"
                                name="imagePicker"
                                accept="image/jpeg, image/png, image/webp"
                                className="hidden"
                                onChange={handleImageSelect}
                            />
                            <FaRegImage />
                        </label>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setShowEmojiPicker(!showEmojiPicker);
                            }}
                        >
                            <FaRegSmileBeam />
                        </button>
                        <button
                            disabled={!newPostText}
                            className="flex items-center justify-center h-8 w-8 bg-blue-500 hover:bg-blue-600 text-white ml-auto text-sm"
                            title={
                                newPostText
                                    ? undefined
                                    : 'Please enter a message'
                            }
                        >
                            <MdSend />
                        </button>
                        {showEmojiPicker && (
                            <EmojiPicker
                                setNewPostText={setNewPostText}
                                setShowEmojiPicker={setShowEmojiPicker}
                            />
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}
