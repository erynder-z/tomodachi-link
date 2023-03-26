import React from 'react';
import useAuth from '../../../../hooks/useAuth';
import useInfoOverlay from '../../../../hooks/useInfoOverlay';
import { usePasswordComparison } from '../../../../hooks/usePasswordComparison';
import { FaExclamationTriangle, FaRegSmile } from 'react-icons/fa';

type Props = {
    setShowOverlay: React.Dispatch<React.SetStateAction<boolean>>;
    setShowOptions?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UpdatePasswordForm({
    setShowOverlay,
    setShowOptions,
}: Props) {
    const { token } = useAuth();
    const { setInfo } = useInfoOverlay();

    const {
        isMatchingPassword,
        handlePasswordChange,
        handleConfirmPasswordChange,
    } = usePasswordComparison({ password: '', confirmPassword: '' });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (token) {
            const form = event.target as HTMLFormElement;
            const formData = new FormData(form);

            const body = {
                current_password: formData.get('current_password'),
                new_password: formData.get('new_password'),
                confirm_new_password: formData.get('confirm_new_password'),
            };

            const serverURL = import.meta.env.VITE_SERVER_URL;
            const response = await fetch(`${serverURL}/api/v1/password`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
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

            setInfo({
                message: 'Password updated successfully!',
                icon: <FaRegSmile />,
            });
            setShowOverlay(false);
            if (setShowOptions) {
                setShowOptions(false);
            }
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <div>
                <h1 className="text-2xl font-semibold">Change Password</h1>
            </div>
            <form
                action=""
                method="POST"
                onSubmit={handleSubmit}
                className="divide-y divide-gray-200"
            >
                <div className="py-8 text-base flex flex-col gap-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                        <input
                            required
                            autoComplete="off"
                            id="current_password"
                            name="current_password"
                            type="password"
                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                            placeholder="Current password"
                        />
                        <label
                            htmlFor="current_password"
                            className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                            Current password
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            required
                            autoComplete="off"
                            id="new_password"
                            name="new_password"
                            type="password"
                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                            placeholder="New password"
                            onChange={handlePasswordChange}
                        />
                        <label
                            htmlFor="new_password"
                            className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                            New password
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            required
                            autoComplete="off"
                            id="confirm_new_password"
                            name="confirm_new_password"
                            type="password"
                            className={`peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 ${
                                isMatchingPassword
                                    ? 'border-green-500'
                                    : 'border-red-500'
                            }`}
                            placeholder="Confirm new password"
                            onChange={handleConfirmPasswordChange}
                        />
                        <label
                            htmlFor="confirm_new_password"
                            className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                            Confirm new password
                        </label>
                    </div>
                    <div className="flex w-full">
                        <button className="w-full bg-blue-500 text-white rounded-md px-2 py-1">
                            Update
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
