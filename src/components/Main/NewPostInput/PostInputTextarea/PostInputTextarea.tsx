import React from 'react';

type PostInputTextareaProps = {
    newPostText: string;
    handleNewPostChange: (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => void;
    username: string | undefined;
};

export default function PostInputTextarea({
    newPostText,
    handleNewPostChange,
    username,
}: PostInputTextareaProps) {
    return (
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
    );
}
