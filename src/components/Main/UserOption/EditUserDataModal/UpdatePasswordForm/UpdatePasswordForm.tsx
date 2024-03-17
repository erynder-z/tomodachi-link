import useAuth from '../../../../../hooks/useAuth';
import useInfoCard from '../../../../../hooks/useInfoCard';
import { usePasswordComparison } from '../../../../../hooks/usePasswordComparison';
import useCurrentUserData from '../../../../../hooks/useCurrentUserData';
import { motion } from 'framer-motion';
import { displayErrorInfo } from '../../../../UiElements/UserNotification/displayErrorInfo';
import { displaySuccessInfo } from '../../../../UiElements/UserNotification/displaySuccessInfo';

type UpdatePasswordFormProps = {
    resetOverlays: () => void;
    setShowOptions?: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * React component for updating the user's password.
 *
 * @component
 * @param {UpdatePasswordFormProps} props - The component props.
 * @returns {JSX.Element} The rendered UpdatePasswordForm component.
 */
export default function UpdatePasswordForm({
    resetOverlays,
    setShowOptions,
}: UpdatePasswordFormProps): JSX.Element {
    const { token } = useAuth();
    const { currentUserData } = useCurrentUserData();
    const { setInfo } = useInfoCard();

    const isGuest = currentUserData?.accountType === 'guest';

    const {
        isMatchingPassword,
        handlePasswordChange,
        handleConfirmPasswordChange,
    } = usePasswordComparison({ password: '', confirmPassword: '' });

    /**
     * Handles the form submission to update the user's password.
     *
     * @async
     * @function
     * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
     * @returns {Promise<void>} A promise that resolves when the password is updated.
     */
    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();
        if (token) {
            const form = event.target as HTMLFormElement;
            const formData = new FormData(form);

            const body = {
                currentPassword: formData.get('currentPassword'),
                newPassword: formData.get('newPassword'),
                confirmNewPassword: formData.get('confirmNewPassword'),
            };

            const SERVER_URL = import.meta.env.VITE_SERVER_URL;
            const response = await fetch(`${SERVER_URL}/api/v1/password`, {
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

                displayErrorInfo(setInfo, message, '👻');

                throw new Error(
                    `Error: ${response.status} ${response.statusText}`
                );
            }

            displaySuccessInfo(setInfo, 'Password updated successfully!', '👍');
            resetOverlays();
            if (setShowOptions) {
                setShowOptions(false);
            }
        }
    };

    /**
     * JSX for the current password input.
     *
     * @type {JSX.Element}
     */
    const CurrentPasswordInput: JSX.Element = (
        <div className="relative z-0">
            <input
                required
                autoComplete="off"
                id="currentPassword"
                name="currentPassword"
                type="password"
                className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-highlight focus:dark:border-highlightDark peer"
                placeholder=" "
            />
            <label
                htmlFor="current_password"
                className="absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:border-highlight peer-focus:dark:border-highlightDark peer-focus:bg-highlight peer-focus:dark:bg-highlightDark peer-focus:rounded peer-focus:px-2 peer-focus:text-regularTextDark peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
                Current password
            </label>
        </div>
    );

    /**
     * JSX for the new password input.
     *
     * @type {JSX.Element}
     */
    const NewPasswordInput: JSX.Element = (
        <div className="relative z-0">
            <input
                required
                autoComplete="off"
                id="newPassword"
                name="newPassword"
                type="password"
                className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-highlight focus:dark:border-highlightDark peer"
                placeholder=" "
                onChange={handlePasswordChange}
            />
            <label
                htmlFor="current_password"
                className="absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:border-highlight peer-focus:dark:border-highlightDark peer-focus:bg-highlight peer-focus:dark:bg-highlightDark peer-focus:rounded peer-focus:px-2 peer-focus:text-regularTextDark peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
                New password
            </label>
        </div>
    );

    /**
     * JSX for the confirm new password input.
     *
     * @type {JSX.Element}
     */
    const ConfirmNewPasswordInput: JSX.Element = (
        <div className="relative z-0">
            <input
                required
                autoComplete="off"
                id="confirmNewPassword"
                name="confirmNewPassword"
                type="password"
                className={`block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-highlight focus:dark:border-highlightDark peer ${
                    isMatchingPassword ? 'border-green-500' : 'border-red-500'
                }`}
                placeholder=" "
                onChange={handleConfirmPasswordChange}
            />
            <label
                htmlFor="confirm_new_password"
                className="absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:border-highlight peer-focus:dark:border-highlightDark peer-focus:bg-highlight peer-focus:dark:bg-highlightDark peer-focus:rounded peer-focus:px-2 peer-focus:text-regularTextDark peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
                Confirm new password
            </label>
        </div>
    );

    /**
     * JSX for the button to update password for a guest account.
     *
     * @type {JSX.Element}
     */
    const GuestButton: JSX.Element = (
        <motion.button
            disabled
            whileTap={{ scale: 0.97 }}
            className="w-full bg-gray-500 text-regularTextDark px-2 py-1 rounded"
        >
            Cannot change guest password!
        </motion.button>
    );

    /**
     * JSX for the button to update password for a normal user.
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
     * The rendered UpdatePasswordForm component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="flex flex-col justify-center items-center">
            <div>
                <h1 className="text-2xl font-semibold">Change Password</h1>
            </div>
            <form
                action=""
                method="POST"
                onSubmit={handleSubmit}
                className="divide-y divide-gray-200 w-full"
            >
                <div className="pt-8 text-base flex flex-col gap-4 text-regularText dark:text-regularTextDark sm:text-lg sm:leading-7">
                    {CurrentPasswordInput}
                    {NewPasswordInput}

                    {ConfirmNewPasswordInput}
                    <div className="flex w-full">
                        {isGuest ? GuestButton : NormalUserButton}
                    </div>
                </div>
            </form>
        </div>
    );
}
