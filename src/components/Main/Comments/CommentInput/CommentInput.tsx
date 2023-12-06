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

export default function CommentInput({
    parentItemID,
    getPostDetails,
    handleRefreshPollData,
}: CommentInputProps) {
    const { token } = useAuth();
    const { setInfo } = useInfoCard();
    const [commentText, setCommentText] = useState<string>('');

    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
        setCommentText(event.target.value);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

    const CommentTextArea = (
        <textarea
            className="w-full p-2 mb-2 bg-gray-200 dark:bg-gray-600 text-sm focus:outline-none focus:shadow-outline"
            placeholder="Write a comment..."
            value={commentText}
            onChange={handleInputChange}
        />
    );

    const EmojiInputButton = (
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

    const SubmitButton = (
        <motion.button
            disabled={isSubmitting || !commentText}
            whileTap={{ scale: 0.97 }}
            className={`flex justify-center items-center text-regularTextDark font-bold h-8 w-16 py-2 px-4 rounded duration-300 ${
                !commentText || isSubmitting
                    ? 'bg-gray-500 hover:bg-gray-600'
                    : 'bg-button dark:bg-buttonDark hover:bg-buttonHover dark:hover:bg-buttonDarkHover'
            }`}
            type="submit"
        >
            {isSubmitting ? <ButtonBusy /> : <MdSend />}
        </motion.button>
    );

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
