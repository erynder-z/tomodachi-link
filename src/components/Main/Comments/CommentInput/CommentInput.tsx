import { useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import { FaRegSmileBeam } from 'react-icons/fa';
import { MdSend } from 'react-icons/md';
import EmojiSelector from '../../Post/NewPostInput/EmojiSelector/EmojiPicker';
import ButtonBusy from '../../../UiElements/LoadingSpinner/ButtonBusy';
import { motion } from 'framer-motion';
import { displaySuccessInfo } from '../../../UiElements/UserNotification/displaySuccessInfo';
import { displayErrorInfo } from '../../../UiElements/UserNotification/displayErrorInfo';

type CommentInputProps = {
    parentItemID: string;
    getPostDetails?: (postID: string) => Promise<void>;
    handleRefreshPollData?: () => Promise<void>;
};

/**
 * CommentInput component for creating comments on a post or poll.
 *
 * @component
 * @param {CommentInputProps} props - The props object.
 * @param {string} props.parentItemID - The ID of the parent post or item.
 * @param {Function} [props.getPostDetails] - A function to get details of the post after commenting.
 * @param {Function} [props.handleRefreshPollData] - A function to refresh poll data after commenting.
 * @returns {JSX.Element} The rendered CommentInput component.
 */
export default function CommentInput({
    parentItemID,
    getPostDetails,
    handleRefreshPollData,
}: CommentInputProps): JSX.Element {
    const { token } = useAuth();
    const { setInfo } = useInfoCard();
    const [commentText, setCommentText] = useState<string>('');

    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    /**
     * Handles input change in the comment textarea.
     *
     * @function
     * @param {React.ChangeEvent<HTMLTextAreaElement>} event - The change event.
     * @returns {void} No return value.
     */
    const handleInputChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ): void => setCommentText(event.target.value);

    /**
     * Handles form submission to create a new comment.
     *
     * @async
     * @function
     * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
     * @returns {Promise<void>} A promise that resolves after handling the form submission.
     */
    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();

        if (token) {
            setIsSubmitting(true);
            try {
                const body = {
                    newComment: commentText,
                };

                const SERVER_URL = import.meta.env.VITE_SERVER_URL;
                const id = parentItemID;
                const response = await fetch(
                    `${SERVER_URL}/api/v1/comment/${id}/create`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(body),
                    }
                );

                if (response.ok) {
                    displaySuccessInfo(
                        setInfo,
                        'Comment created successfully!',
                        '👍'
                    );
                    setCommentText('');

                    if (getPostDetails) getPostDetails(parentItemID);
                    if (handleRefreshPollData) handleRefreshPollData();
                } else {
                    const data = await response.json();
                    const errorMessages = data.errors;
                    const message = errorMessages
                        .map((error: { msg: string }) => error.msg)
                        .join(', ');

                    displayErrorInfo(setInfo, message, '👻');

                    throw new Error(
                        `Error: ${response.status} ${response.statusText}`
                    );
                }
            } catch (error) {
                displayErrorInfo(setInfo, 'Something went wrong!', '👻');
            }

            setIsSubmitting(false);
        }
    };

    /**
     * Content for the text area.
     *
     * @type {JSX.Element}
     */
    const CommentTextArea: JSX.Element = (
        <textarea
            className="w-full p-2 mb-2 bg-gray-200 dark:bg-gray-600 text-sm focus:outline-none focus:shadow-outline"
            placeholder="Write a comment..."
            value={commentText}
            onChange={handleInputChange}
        />
    );

    /**
     * Content for the emoji button.
     *
     * @type {JSX.Element}
     */
    const EmojiInputButton: JSX.Element = (
        <motion.button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowEmojiPicker(!showEmojiPicker);
            }}
            whileTap={{ scale: 0.97 }}
            className="text-back hover:text-blue-500"
        >
            <FaRegSmileBeam />
        </motion.button>
    );

    /**
     * Content for the submit button.
     *
     * @type {JSX.Element}
     */
    const SubmitButton: JSX.Element = (
        <motion.button
            disabled={isSubmitting || !commentText}
            whileTap={{ scale: 0.97 }}
            className={`flex justify-center items-center text-regularTextDark font-bold h-8 w-16 py-2 px-4 rounded duration-300 ${
                !commentText || isSubmitting
                    ? 'bg-gray-500 hover:bg-gray-600'
                    : 'bg-highlight dark:bg-highlightDark hover:bg-highlightHover dark:hover:bg-highlightDarkHover'
            }`}
            type="submit"
        >
            {isSubmitting ? <ButtonBusy /> : <MdSend />}
        </motion.button>
    );

    /**
     * Renders the CommentInput component.
     *
     * @return {JSX.Element} The rendered CommentInput component.
     */
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="flex gap-4">
                    {CommentTextArea}
                    {EmojiInputButton}
                </div>
                {SubmitButton}
            </form>
            {showEmojiPicker && (
                <EmojiSelector
                    setText={setCommentText}
                    setShowEmojiPicker={setShowEmojiPicker}
                />
            )}
        </>
    );
}
