import React, { useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import useInfoOverlay from '../../../../hooks/useInfoOverlay';
import useUserData from '../../../../hooks/useUserData';
import { FaRegSmile, FaFileUpload } from 'react-icons/fa';
import { handleFetchErrors } from '../../../../utilities/handleFetchErrors';

type Props = {
    setShowOverlay: React.Dispatch<React.SetStateAction<boolean>>;
    setShowOptions?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditUserDataModalForm({
    setShowOverlay,
    setShowOptions,
}: Props) {
    const { token } = useAuth();
    const { userData, handleFetchUserData } = useUserData();
    const { setInfo } = useInfoOverlay();
    const { first_name, last_name, email, userpic } = userData || {};
    const base64String = btoa(
        String.fromCharCode(...new Uint8Array(userpic?.data?.data))
    );

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();

        if (token) {
            const form = event.target as HTMLFormElement;
            const formData = new FormData(form);

            const serverURL = import.meta.env.VITE_SERVER_URL;
            const response = await fetch(`${serverURL}/api/v1/userdata`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                await handleFetchErrors(response, setInfo);
            }

            setInfo({
                message: 'Profile updated successfully!',
                icon: <FaRegSmile />,
            });
            handleFetchUserData();
            setShowOverlay(false);
            setShowOptions && setShowOptions(false);
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <div>
                <h1 className="text-2xl font-semibold">Edit Profile</h1>
            </div>
            <form
                action=""
                method="POST"
                onSubmit={handleSubmit}
                className="divide-y divide-gray-200"
            >
                <div className="py-8 text-base flex flex-col gap-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="flex flex-col ml-auto">
                        <img
                            className="w-16 h-16 object-cover rounded-full mx-auto "
                            src={
                                selectedFile
                                    ? URL.createObjectURL(selectedFile)
                                    : `data:image/png;base64,${base64String}`
                            }
                            alt="User avatar"
                        />
                        <label className="flex items-end justify-end cursor-pointer">
                            <input
                                type="file"
                                name="imagePicker"
                                onChange={(event) => {
                                    const file = event.target.files?.[0];
                                    setSelectedFile(file || null);
                                }}
                                className="hidden"
                            />
                            <FaFileUpload />
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            required
                            autoComplete="off"
                            id="first_name"
                            name="first_name"
                            type="text"
                            defaultValue={first_name}
                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                            placeholder="First name"
                        />
                        <label
                            htmlFor="first_name"
                            className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                            First name
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            required
                            autoComplete="off"
                            id="last_name"
                            name="last_name"
                            type="text"
                            defaultValue={last_name}
                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                            placeholder="Last name"
                        />
                        <label
                            htmlFor="last_name"
                            className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                            Last name
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            required
                            autoComplete="off"
                            id="email"
                            name="email"
                            type="email"
                            defaultValue={email}
                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                            placeholder="Email"
                        />
                        <label
                            htmlFor="email"
                            className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                            Email
                        </label>
                    </div>

                    <div className="relative mt-12">
                        <label htmlFor="password" className="text-sm">
                            Enter password to authorize:
                        </label>
                        <input
                            required
                            autoComplete="off"
                            id="password"
                            name="password"
                            type="password"
                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                            placeholder="Password"
                        />
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