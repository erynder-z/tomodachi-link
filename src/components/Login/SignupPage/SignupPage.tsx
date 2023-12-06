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

export default function SignupPage({ setShowSignup }: SignupPageProps) {
    const { setToken } = useAuth();
    const { setInfo } = useInfoCard();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

    const handleRequestError = async (response: Response) => {
        const data = await response.json();
        const errorMessage = data.error?.message || 'Something went wrong!';
        /*        displayErrorInfo(errorMessage); */
        displayErrorInfo(setInfo, errorMessage, '👻');

        throw new Error(`Error: ${response.status} ${response.statusText}`);
    };

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
            localStorage.setItem('jwtOdinBook', data.token);
            setToken(data.token);
        } catch (error: unknown) {
            console.error(error);
        }
    };

    const signup = async (
        firstName: string,
        lastName: string,
        email: string,
        username: string,
        password: string,
        confirmPassword: string
    ) => {
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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
