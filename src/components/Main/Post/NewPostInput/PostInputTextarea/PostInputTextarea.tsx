import { useState, useEffect, useRef } from 'react';

type PostInputTextareaProps = {
    postText: string;
    handleNewPostChange: (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => void;
    firstName: string | undefined;
    isPostEdit?: boolean;
};

export default function PostInputTextarea({
    postText,
    handleNewPostChange,
    firstName,
    isPostEdit,
}: PostInputTextareaProps) {
    const [textareaRows, setTextareaRows] = useState(1);
    const [isTextareaFocused, setIsTextareaFocused] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        if (textareaRef.current && isPostEdit) {
            autoResizeTextarea(textareaRef.current);
        }
    }, []);

    const handleTextareaChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        handleNewPostChange(event);
        autoResizeTextarea(event.target);
    };

    const autoResizeTextarea = (textarea: HTMLTextAreaElement) => {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
        setTextareaRows(textarea.rows);
    };

    return (
        <div className="relative z-0">
            <textarea
                ref={textareaRef}
                rows={textareaRows}
                required
                autoComplete="off"
                id="newPost"
                name="newPost"
                className="block py-2.5 px-0 w-full text-sm text-regularText dark:text-regularTextDark bg-transparent border-0 border-gray-300 appearance-none focus:outline-none focus:ring-0  peer overflow-hidden resize-none"
                placeholder=" "
                value={postText}
                onChange={handleTextareaChange}
                onFocus={() => setIsTextareaFocused(true)}
                onBlur={() => setIsTextareaFocused(false)}
            />
            <label
                htmlFor="newPost"
                className="absolute text-sm text-regularText dark:text-regularTextDark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:bg-highlight peer-focus:dark:bg-highlightDark peer-focus:rounded peer-focus:px-2 peer-focus:text-regularTextDark"
            >
                What's on your mind,&nbsp;{firstName}?
            </label>
            <div className="absolute left-0 bottom-0 w-full h-1 rounded-full overflow-hidden">
                <div
                    className={`h-full w-full  ${
                        isTextareaFocused
                            ? 'bg-highlight dark:bg-highlightDark '
                            : 'animate-colorChangeAnimationBright dark:animate-colorChangeAnimationDark '
                    } `}
                />
            </div>
        </div>
    );
}
