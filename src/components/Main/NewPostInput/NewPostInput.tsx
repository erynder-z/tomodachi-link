import React, { useState } from 'react';
import useUserData from '../../../hooks/useUserData';
import useAuth from '../../../hooks/useAuth';
import useInfoOverlay from '../../../hooks/useInfoOverlay';
import { FaExclamationTriangle, FaRegSmile } from 'react-icons/fa';

type Props = {
    onPostSuccess: () => void;
};

export default function NewPostInput({ onPostSuccess }: Props) {
    const { token } = useAuth();
    const { setInfo } = useInfoOverlay();
    const { userData } = useUserData();
    const { username } = userData || {};

    const [newPostText, setNewPostText] = useState<string>('');

    const handleNewPostChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setNewPostText(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (token) {
            const body = {
                newPost: newPostText,
            };

            const serverURL = import.meta.env.VITE_SERVER_URL;
            const response = await fetch(`${serverURL}/api/v1/post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                setInfo({
                    message: 'Post created successfully!',
                    icon: <FaRegSmile />,
                });
                setNewPostText('');
                onPostSuccess();
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
        <div className="flex gap-4 md:p-4 lg:w-full lg:flex-row lg:justify-around lg:rounded-md lg:shadow-lg bg-card">
            <form
                action=""
                method="POST"
                onSubmit={handleSubmit}
                className="flex w-full divide-gray-200"
            >
                <div className="w-full py-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                        <textarea
                            rows={4}
                            required
                            autoComplete="off"
                            id="newPost"
                            name="newPost"
                            className="peer placeholder-transparent w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                            placeholder="message"
                            value={newPostText}
                            onChange={handleNewPostChange}
                        />
                        <label
                            htmlFor="newPost"
                            className="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                            what's on your mind, {username}?
                        </label>
                    </div>

                    <div className="flex w-full">
                        <button
                            disabled={!newPostText}
                            className="w-full bg-blue-500 text-white rounded-md px-2 py-1"
                            title={
                                newPostText
                                    ? undefined
                                    : 'Please enter a message'
                            }
                        >
                            Post
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
