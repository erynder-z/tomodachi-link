import { FaTimes } from 'react-icons/fa';
import SignupForm from './SignupForm';
import useInfoCard from '../../../hooks/useInfoCard';
import { useState } from 'react';
import { motion } from 'framer-motion';
import useAuth from '../../../hooks/useAuth';
import LoggingInInfo from './LoggingInInfo/LoggingInInfo';
import { displayErrorInfo } from '../../UiElements/UserNotification/displayErrorInfo';
import { displaySuccessInfo } from '../../UiElements/UserNotification/displaySuccessInfo';

type SignupPageProps = {
    setShowSignup: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * Renders a signup page with a signup form.
 *
 * @component
 * @param {SignupPageProps} props - The props object.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setShowSignup - A state setter to control the visibility of the signup page.
 * @return {JSX.Element} The rendered signup page component.
 */
export default function SignupPage({
    setShowSignup,
}: SignupPageProps): JSX.Element {
    const { setToken } = useAuth();
    const { setInfo } = useInfoCard();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

    /**
     * Handles the error response from a request.
     *
     * @param {Response} response - The response object.
     * @return {Promise<void>} - A promise that resolves when the error has been handled.
     */
    const handleRequestError = async (response: Response): Promise<void> => {
        const data = await response.json();
        const errorMessage = data.error?.message || 'Something went wrong!';
        displayErrorInfo(setInfo, errorMessage, '👻');

        throw new Error(`Error: ${response.status} ${response.statusText}`);
    };

    /**
     * Logs in the user with the provided username and password.
     *
     * @param {string} username - The username of the user.
     * @param {string} password - The password of the user.
     */
    const login = async (username: string, password: string) => {
        setInfo(null);

        try {
            const SERVER_URL = import.meta.env.VITE_SERVER_URL;
            const response = await fetch(`${SERVER_URL}/api/v1/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                await handleRequestError(response);
            }

            const data = await response.json();
            localStorage.setItem('jwtTomodachiLink', data.token);
            setToken(data.token);
        } catch (error: unknown) {
            console.error(error);
        }
    };

    /**
     * Sign up a new user with the provided information.
     *
     * @param {string} firstName - The first name of the user.
     * @param {string} lastName - The last name of the user.
     * @param {string} email - The email address of the user.
     * @param {string} username - The username of the user.
     * @param {string} password - The password of the user.
     * @param {string} confirmPassword - The confirmation password of the user.
     * @return {Promise<void>}
     */
    const signup = async (
        firstName: string,
        lastName: string,
        email: string,
        username: string,
        password: string,
        confirmPassword: string
    ): Promise<void> => {
        setInfo(null);

        try {
            const SERVER_URL = import.meta.env.VITE_SERVER_URL;
            const response = await fetch(`${SERVER_URL}/api/v1/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    username,
                    email,
                    password,
                    confirmPassword,
                }),
            });

            if (!response.ok) {
                await handleRequestError(response);
            }

            displaySuccessInfo(
                setInfo,
                'Registration successful! You will automatically be logged in.',
                '🥳'
            );
            setIsLoggingIn(true);
            setTimeout(() => {
                login(username, password);
            }, 2000);
        } catch (error: unknown) {
            console.error(error);
        }
    };

    /**
     * Handles the form submission event.
     *
     * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
     * @return {Promise<void>} A promise that resolves once the form submission is complete.
     */
    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();

        setIsSubmitting(true);

        const firstNameInput = event.currentTarget.querySelector(
            '[name="firstName"]'
        ) as HTMLInputElement;

        const lastNameInput = event.currentTarget.querySelector(
            '[name="lastName"]'
        ) as HTMLInputElement;

        const emailInput = event.currentTarget.querySelector(
            '[name="email"]'
        ) as HTMLInputElement;

        const usernameInput = event.currentTarget.querySelector(
            '[name="username"]'
        ) as HTMLInputElement;

        const passwordInput = event.currentTarget.querySelector(
            '[name="password"]'
        ) as HTMLInputElement;

        const confirmPasswordInput = event.currentTarget.querySelector(
            '[name="confirmPassword"]'
        ) as HTMLInputElement;

        const firstName = firstNameInput.value;
        const lastName = lastNameInput.value;
        const email = emailInput.value;
        const username = usernameInput.value;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        try {
            await signup(
                firstName,
                lastName,
                email,
                username,
                password,
                confirmPassword
            );
        } catch (error) {
            displayErrorInfo(setInfo, 'Something went wrong!', '👻');
        }
        setIsSubmitting(false);
    };

    const handleCloseButtonClick = () => setShowSignup(false);

    /**
     * Renders the SignupPage component.
     *
     * @return {JSX.Element} The rendered SignupPage component.
     */
    return (
        <motion.div
            key="signupPage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-center items-center"
        >
            <div className="flex justify-center items-center w-full h-full">
                {isLoggingIn ? (
                    <LoggingInInfo />
                ) : (
                    <div className="relative w-5/6 sm:w-2/3 lg:w-1/4 px-4  bg-white shadow-lg p-4 md:p-8 rounded lg:rounded-lg">
                        <motion.button
                            onClick={handleCloseButtonClick}
                            whileTap={{ scale: 0.97 }}
                            className="absolute top-4 right-4"
                        >
                            <FaTimes />
                        </motion.button>

                        <SignupForm
                            handleSubmit={handleSubmit}
                            isSubmitting={isSubmitting}
                        />
                    </div>
                )}
            </div>
        </motion.div>
    );
}
