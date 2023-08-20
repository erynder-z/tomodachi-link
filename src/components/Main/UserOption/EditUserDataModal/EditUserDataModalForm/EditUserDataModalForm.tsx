import React, { useState } from 'react';
import useAuth from '../../../../../hooks/useAuth';
import useInfoCard from '../../../../../hooks/useInfoCard';
import useCurrentUserData from '../../../../../hooks/useCurrentUserData';
import { FaFileUpload } from 'react-icons/fa';
import { handleFetchErrors } from '../../../../../utilities/handleFetchErrors';
import { convertDatabaseImageToBase64 } from '../../../../../utilities/convertDatabaseImageToBase64';
import AvatarCreator from '../AvatarCreator/AvatarCreator';

type EditUserDataModalFormProps = {
    setShouldOverlaysShow: React.Dispatch<
        React.SetStateAction<{
            searchOverlay: boolean;
            editUserDataModal: boolean;
            mobileOptionsModal: boolean;
            guestAccountOverlay: boolean;
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

    const isGuest = currentUserData?.accountType === 'guest';

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
                icon: '👍',
            });
            handleFetchUserData();
            setShouldOverlaysShow({
                searchOverlay: false,
                editUserDataModal: false,
                mobileOptionsModal: false,
                guestAccountOverlay: false,
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
        <>
            <div>
                <h1 className="text-2xl font-semibold">Edit Profile</h1>
            </div>
            <form
                action=""
                method="POST"
                onSubmit={handleSubmit}
                className="divide-y divide-gray-200"
            >
                <div className="py-8 text-base flex flex-col gap-4 text-regularText dark:text-regularTextDark sm:text-lg sm:leading-7">
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
                    <div className="relative z-0">
                        <input
                            required
                            autoComplete="off"
                            id="firstName"
                            name="firstName"
                            type="text"
                            defaultValue={firstName}
                            className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-highlight focus:dark:border-highlightDark peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="firstName"
                            className="absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:border-highlight peer-focus:dark:border-highlightDark peer-focus:bg-highlight peer-focus:dark:bg-highlightDark peer-focus:rounded peer-focus:px-2 peer-focus:text-regularTextDark peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            First name
                        </label>
                    </div>
                    <div className="relative z-0">
                        <input
                            required
                            autoComplete="off"
                            id="lastName"
                            name="lastName"
                            type="text"
                            defaultValue={lastName}
                            className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-highlight focus:dark:border-highlightDark peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="lastName"
                            className="absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:border-highlight peer-focus:dark:border-highlightDark peer-focus:bg-highlight peer-focus:dark:bg-highlightDark peer-focus:rounded peer-focus:px-2 peer-focus:text-regularTextDark peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Last name
                        </label>
                    </div>
                    <div className="relative z-0">
                        <input
                            required
                            autoComplete="off"
                            id="email"
                            name="email"
                            type="email"
                            defaultValue={email}
                            className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-highlight focus:dark:border-highlightDark peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="email"
                            className="absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:border-highlight peer-focus:dark:border-highlightDark peer-focus:bg-highlight peer-focus:dark:bg-highlightDark peer-focus:rounded peer-focus:px-2 peer-focus:text-regularTextDark peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Email
                        </label>
                    </div>

                    <div className="relative mt-12 z-0">
                        <input
                            required
                            autoComplete="off"
                            id="password"
                            name="password"
                            type="password"
                            className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-highlight focus:dark:border-highlightDark peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="password"
                            className="absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:border-highlight peer-focus:dark:border-highlightDark peer-focus:bg-highlight peer-focus:dark:bg-highlightDark peer-focus:rounded peer-focus:px-2 peer-focus:text-regularTextDark peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Enter password to authorize:
                        </label>
                    </div>
                    <div className="flex w-full">
                        {isGuest ? (
                            <button
                                disabled
                                className="w-full bg-gray-500 text-white px-2 py-1"
                            >
                                Cannot update guest account!
                            </button>
                        ) : (
                            <button className="w-full bg-button dark:bg-buttonDark hover:bg-buttonHover dark:hover:bg-buttonDarkHover text-regularTextDark px-2 py-1 rounded">
                                Update
                            </button>
                        )}
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
        </>
    );
}
