import { useState, useEffect, useRef } from 'react';
import { FaPencil } from 'react-icons/fa6';

type PostInputTextareaProps = {
    postText: string;
    handleNewPostChange: (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => void;
    firstName: string | undefined;
    isPostEdit?: boolean;
};

/**
 * Component for rendering a text area for user input, with dynamic resizing based on content.
 *
 * @component
 * @param {PostInputTextareaProps} props - The props object.
 * @param {string} props.postText - The text content of the text area.
 * @param {(event: React.ChangeEvent<HTMLTextAreaElement>) => void} props.handleNewPostChange - The callback function to handle changes in the text area.
 * @param {string | undefined} props.firstName - The first name of the user (or undefined if not available).
 * @param {boolean} [props.isPostEdit] - A flag indicating whether the text area is used for post editing.
 * @returns {JSX.Element} The rendered PostInputTextarea component.
 */
export default function PostInputTextarea({
    postText,
    handleNewPostChange,
    firstName,
    isPostEdit,
}: PostInputTextareaProps): JSX.Element {
    const [textareaRows, setTextareaRows] = useState(1);
    const [isTextareaFocused, setIsTextareaFocused] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    /**
     * Function to handle changes in the text area content.
     *
     * @function
     * @param {React.ChangeEvent<HTMLTextAreaElement>} event - The change event object.
     * @returns {void}
     */
    const handleTextareaChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ): void => {
        handleNewPostChange(event);
        autoResizeTextarea(event.target);
    };

    /**
     * Function to auto-resize the text area based on its content.
     *
     * @function
     * @param {HTMLTextAreaElement} textarea - The HTMLTextAreaElement to resize.
     * @returns {void}
     */
    const autoResizeTextarea = (textarea: HTMLTextAreaElement): void => {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
        setTextareaRows(textarea.rows);
    };

    /**
     * Effect to auto-resize the text area on mount (specific to post editing).
     *
     * @function
     * @returns {void}
     */
    useEffect(() => {
        if (textareaRef.current && isPostEdit) {
            autoResizeTextarea(textareaRef.current);
        }
    }, []);

    /**
     * Decode HTML entities in a given text string to unescape sanitized strings.
     *
     * @param {string} text - the text containing HTML entities to be decoded
     * @return {string} the text with HTML entities decoded
     */
    const decodeHtmlEntities = (text: string) => {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = text;
        return textarea.value;
    };

    /**
     * The rendered PostInputTextarea component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="relative z-0">
            <textarea
                ref={textareaRef}
                rows={textareaRows}
                required
                autoComplete="off"
                id="newPost"
                name="newPost"
                className="block py-2.5 px-2 w-full text-sm text-regularText dark:text-regularTextDark bg-transparent border-0 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer overflow-hidden resize-none"
                placeholder=" "
                value={decodeHtmlEntities(postText)}
                onChange={handleTextareaChange}
                onFocus={() => setIsTextareaFocused(true)}
                onBlur={() => setIsTextareaFocused(false)}
            />
            <label
                htmlFor="newPost"
                className="absolute text-sm px-2 text-regularText dark:text-regularTextDark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:bg-highlight peer-focus:dark:bg-highlightDark peer-focus:rounded peer-focus:px-2 peer-focus:text-regularTextDark"
            >
                <span className="flex justify-center items-center gap-2">
                    What's on your mind,&nbsp;
                    {firstName}?
                    <FaPencil
                        className={` ${
                            !isTextareaFocused ? 'animate-bounce ' : ''
                        } `}
                    />
                </span>
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
