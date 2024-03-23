import { useState } from 'react';
import useAuth from '../../../../../hooks/useAuth';
import useInfoCard from '../../../../../hooks/useInfoCard';
import useCurrentUserData from '../../../../../hooks/useCurrentUserData';
import { FaFileUpload } from 'react-icons/fa';
import { handleFetchErrors } from '../../../../../utilities/handleFetchErrors';
import AvatarCreator from '../AvatarCreator/AvatarCreator';
import { motion } from 'framer-motion';
import { displaySuccessInfo } from '../../../../UiElements/UserNotification/displaySuccessInfo';

type EditUserDataModalFormProps = {
    resetOverlays: () => void;
    setShowOptions?: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * React component for editing user data.
 *
 * @component
 * @param {EditUserDataModalFormProps} props - The component props.
 * @returns {JSX.Element} The rendered EditUserDataModalForm component.
 */
export default function EditUserDataModalForm({
    resetOverlays,
    setShowOptions,
}: EditUserDataModalFormProps): JSX.Element {
    const { token } = useAuth();
    const { currentUserData, handleFetchUserData } = useCurrentUserData();
    const { setInfo } = useInfoCard();
    const {
        firstName = '',
        lastName = '',
        email = '',
        about = '',
        userpic = '',
    } = currentUserData || {};

    const [image, setImage] = useState<{
        selectedFile: File | null;
        preview: string;
    }>({
        selectedFile: null,
        preview: typeof userpic !== 'string' ? userpic.data : '',
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

    /**
     * Handles the form submission.
     *
     * @async
     * @function
     * @param {React.FormEvent<HTMLFormElement>} event - The form event.
     * @returns {Promise<void>} A promise that resolves after handling the submission.
     */
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
            formData.append('about', event.currentTarget.about.value);

            const SERVER_URL = import.meta.env.VITE_SERVER_URL;
            const response = await fetch(`${SERVER_URL}/api/v1/userdata`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) await handleFetchErrors(response, setInfo);

            displaySuccessInfo(setInfo, 'Profile updated successfully!', '👍');
            handleFetchUserData();
            resetOverlays();
            setShowOptions && setShowOptions(false);
        }
    };

    /**
     * Handles the confirmation of the image in the AvatarCreator.
     *
     * @function
     * @returns {void}
     */
    const handleConfirmImage = (): void => setShowCropper(false);

    /**
     * Handles the closing of the AvatarCreator.
     *
     * @function
     * @returns {void}
     */
    const handleAvatarCreatorClose = (): void => setImage(originalImage);

    /**
     * JSX element for the user image section.
     *
     * @type {JSX.Element}
     */
    const UserImageSection: JSX.Element = (
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
    );

    /**
     * JSX element for the first name input.
     *
     * @type {JSX.Element}
     */
    const FirstNameInput: JSX.Element = (
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
    );
    /**
     * JSX element for the last name input.
     *
     * @type {JSX.Element}
     */
    const LastNameInput: JSX.Element = (
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
    );

    /**
     * JSX element for the email input.
     *
     * @type {JSX.Element}
     */
    const EmailInput: JSX.Element = (
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
    );

    /**
     * JSX element for the about-field input.
     *
     * @type {JSX.Element}
     */
    const AboutInput: JSX.Element = (
        <div className="relative z-0">
            <textarea
                rows={3}
                autoComplete="off"
                id="about"
                name="about"
                className="block p-2 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-highlight focus:dark:border-highlightDark peer"
                placeholder=" "
                defaultValue={about}
            />
            <label
                htmlFor="about"
                className="absolute text-sm text-regularText dark:text-regularTextDark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-4 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:bg-highlight peer-focus:dark:bg-highlightDark peer-focus:rounded peer-focus:px-2 peer-focus:text-regularTextDark"
            >
                About me (max. 100 characters)
            </label>
        </div>
    );

    /**
     * Button to display instead of the update button if the user is a guest.
     *
     * @type {JSX.Element}
     */
    const GuestButton: JSX.Element = (
        <motion.button
            disabled
            whileTap={{ scale: 0.97 }}
            className="w-full bg-gray-500 text-white px-2 py-1"
        >
            Cannot update guest account!
        </motion.button>
    );

    /**
     * Profile update button.
     *
     * @type {JSX.Element}
     */
    const NormalUserButton: JSX.Element = (
        <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full bg-button dark:bg-buttonDark hover:bg-buttonHover dark:hover:bg-buttonDarkHover text-regularTextDark px-2 py-1 rounded"
        >
            Update
        </motion.button>
    );

    /**
     * The rendered EditUserDataModalForm component.
     *
     * @type {JSX.Element}
     */
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
                <div className="py-4 md:py-8 text-base flex flex-col gap-4 text-regularText dark:text-regularTextDark sm:text-lg sm:leading-7">
                    {UserImageSection}
                    {FirstNameInput}
                    {LastNameInput}
                    {EmailInput}
                    {AboutInput}
                    <div className="flex w-full">
                        {isGuest ? GuestButton : NormalUserButton}
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
