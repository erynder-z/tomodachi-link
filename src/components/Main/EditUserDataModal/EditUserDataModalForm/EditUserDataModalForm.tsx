import React, { useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import useInfoCard from '../../../../hooks/useInfoCard';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';
import { FaRegSmile, FaFileUpload } from 'react-icons/fa';
import { handleFetchErrors } from '../../../../utilities/handleFetchErrors';
import { convertDatabaseImageToBase64 } from '../../../../utilities/convertDatabaseImageToBase64';
import AvatarCreator from '../AvatarCreator/AvatarCreator';

type EditUserDataModalFormProps = {
    setShouldOverlaysShow: React.Dispatch<
        React.SetStateAction<{
            searchOverlay: boolean;
            editUserDataModal: boolean;
            mobileOptionsModal: boolean;
        }>
    >;
    setShowOptions?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditUserDataModalForm({
    setShouldOverlaysShow,
    setShowOptions,
}: EditUserDataModalFormProps) {
    const { token } = useAuth();
    const { currentUserData, handleFetchUserData } = useCurrentUserData();
    const { setInfo } = useInfoCard();
    const {
        firstName = '',
        lastName = '',
        email = '',
        userpic = '',
    } = currentUserData || {};

    const [image, setImage] = useState<{
        selectedFile: File | null;
        preview: string;
    }>({
        selectedFile: null,
        preview:
            typeof userpic !== 'string'
                ? convertDatabaseImageToBase64(userpic)
                : '',
    });

    const [originalImage] = useState({
        selectedFile: image.selectedFile,
        preview: image.preview,
    });

    const [showCropper, setShowCropper] = useState<boolean>(false);

    const imageUrl = image.selectedFile
        ? URL.createObjectURL(image.selectedFile)
        : `data:image/png;base64,${image.preview}`;

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();

        if (token) {
            const formData = new FormData();
            image.selectedFile &&
                formData.append('imagePicker', image.selectedFile);
            formData.append('firstName', event.currentTarget.firstName.value);
            formData.append('lastName', event.currentTarget.lastName.value);
            formData.append('email', event.currentTarget.email.value);
            formData.append('password', event.currentTarget.password.value);

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
                typeOfInfo: 'good',
                message: 'Profile updated successfully!',
                icon: <FaRegSmile />,
            });
            handleFetchUserData();
            setShouldOverlaysShow({
                searchOverlay: false,
                editUserDataModal: false,
                mobileOptionsModal: false,
            });
            setShowOptions && setShowOptions(false);
        }
    };

    const handleConfirmImage = () => {
        setShowCropper(false);
    };

    const handleAvatarCreatorClose = () => {
        setImage(originalImage);
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
                            src={imageUrl}
                            alt="User avatar"
                        />
                        <label className="flex items-end justify-end cursor-pointer">
                            <input
                                type="file"
                                name="imagePicker"
                                onChange={(event) => {
                                    const file = event.target.files?.[0];
                                    setImage((prevState) => ({
                                        selectedFile: file || null,
                                        preview: file
                                            ? URL.createObjectURL(file)
                                            : prevState.preview,
                                    }));

                                    setShowCropper(true);
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
                            id="firstName"
                            name="firstName"
                            type="text"
                            defaultValue={firstName}
                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                            placeholder="First name"
                        />
                        <label
                            htmlFor="firstName"
                            className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                            First name
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            required
                            autoComplete="off"
                            id="lastName"
                            name="lastName"
                            type="text"
                            defaultValue={lastName}
                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                            placeholder="Last name"
                        />
                        <label
                            htmlFor="lastName"
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
                        <button className="w-full bg-blue-500 text-white px-2 py-1">
                            Update
                        </button>
                    </div>
                </div>
            </form>
            {showCropper && image.selectedFile && (
                <AvatarCreator
                    image={image.selectedFile}
                    setImage={setImage}
                    handleConfirmImage={handleConfirmImage}
                    handleAvatarCreatorClose={handleAvatarCreatorClose}
                />
            )}
        </div>
    );
}
