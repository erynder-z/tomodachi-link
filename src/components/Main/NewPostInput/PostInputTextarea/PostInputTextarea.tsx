import React, { useState } from 'react';

type PostInputTextareaProps = {
    postText: string;
    handleNewPostChange: (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => void;
    username: string | undefined;
};

export default function PostInputTextarea({
    postText,
    handleNewPostChange,
    username,
}: PostInputTextareaProps) {
    const [textareaRows, setTextareaRows] = useState(1);
    const [isTextareaEmpty, setIsTextareaEmpty] = useState(postText === '');

    const handleTextareaChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        handleNewPostChange(event);
        autoResizeTextarea(event.target);
        setIsTextareaEmpty(event.target.value === '');
    };

    const autoResizeTextarea = (textarea: HTMLTextAreaElement) => {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
        setTextareaRows(textarea.rows);
    };

    return (
        <div className="relative">
            <textarea
                rows={textareaRows}
                required
                autoComplete="off"
                id="newPost"
                name="newPost"
                className={
                    'peer placeholder-transparent w-full border-b-2 border-gray-300 text-gray-900 leading-tight focus:outline-none bg-blue-100 focus:bg-blue-200 p-2 h-full overflow-hidden resize-none'
                }
                placeholder="message"
                value={postText}
                onChange={handleTextareaChange}
                onBlur={() => setIsTextareaEmpty(postText === '')}
                style={{
                    transition: 'background-color 0.5s ease-in-out',
                }}
            />
            <label
                htmlFor="newPost"
                className={`absolute left-0 text-gray-600 text-sm peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-3 transition-all ${
                    isTextareaEmpty ? 'peer-focus:-top-5' : 'top-[-1.5rem]'
                } peer-focus:text-gray-600 peer-focus:text-xs px-2`}
            >
                What's on your mind, {username}?
            </label>
        </div>
    );
}
