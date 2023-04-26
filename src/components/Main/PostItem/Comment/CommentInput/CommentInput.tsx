import React, { useState } from 'react';
import useAuth from '../../../../../hooks/useAuth';
import useInfoCard from '../../../../../hooks/useInfoCard';
import { FaExclamationTriangle, FaRegSmile } from 'react-icons/fa';

type CommentInputProps = {
    parentPostID: string;
    getPostDetails: (postID: string) => Promise<void>;
};

export default function CommentInput({
    parentPostID,
    getPostDetails,
}: CommentInputProps) {
    const { token } = useAuth();
    const { setInfo } = useInfoCard();
    const [commentText, setCommentText] = useState<string>('');

    const handleInputChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setCommentText(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (token) {
            const body = {
                newComment: commentText,
            };

            const serverURL = import.meta.env.VITE_SERVER_URL;
            const id = parentPostID;
            const response = await fetch(
                `${serverURL}/api/v1/post/${id}/comment`,
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
                setInfo({
                    message: 'Comment created successfully!',
                    icon: <FaRegSmile />,
                });
                setCommentText('');
                getPostDetails(parentPostID);
            } else {
                const data = await response.json();
                const errorMessages = data.errors;
                const message = errorMessages
                    .map((error: { msg: string }) => error.msg)
                    .join(', ');

                setInfo({
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
        <form onSubmit={handleSubmit}>
            <textarea
                className="w-full p-2 mb-2 rounded-md bg-gray-200 text-sm focus:outline-none focus:shadow-outline"
                placeholder="Write a comment..."
                value={commentText}
                onChange={handleInputChange}
            />
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
                disabled={!commentText}
            >
                Submit
            </button>
        </form>
    );
}
