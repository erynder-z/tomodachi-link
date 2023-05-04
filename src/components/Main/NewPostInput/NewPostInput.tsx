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

type NewPostInputProps = {
    onPostSuccess: () => void;
};

export default function NewPostInput({ onPostSuccess }: NewPostInputProps) {
    const { token } = useAuth();
    const { setInfo } = useInfoCard();
    const { currentUserData } = useCurrentUserData();
    const { username } = currentUserData || {};

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
                    typeOfInfo: 'good',
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
                <div className="w-full text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                        <textarea
                            rows={2}
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

                    <div className="flex w-full gap-4">
                        <button>
                            <FaRegImage />
                        </button>
                        <button>
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
                    </div>
                </div>
            </form>
        </div>
    );
}
