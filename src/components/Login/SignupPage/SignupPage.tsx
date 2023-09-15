import { FaTimes } from 'react-icons/fa';
import SignupForm from './SignupForm';
import useInfoCard from '../../../hooks/useInfoCard';
import { useState } from 'react';
import { motion } from 'framer-motion';

type SignupPageProps = {
    setShowSignup: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SignupPage({ setShowSignup }: SignupPageProps) {
    const { setInfo } = useInfoCard();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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
            const serverURL = import.meta.env.VITE_SERVER_URL;
            const response = await fetch(`${serverURL}/api/v1/signup`, {
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
                const data = await response.json();
                const errorMessages = data.errors;
                const message = errorMessages
                    .map((error: { msg: string }) => error.msg)
                    .join(', ');

                setInfo({
                    typeOfInfo: 'bad',
                    message: message,
                    icon: '👻',
                });

                throw new Error(
                    `Error: ${response.status} ${response.statusText}`
                );
            }

            setInfo({
                typeOfInfo: 'good',
                message: 'Registration successful!',
                icon: '🥳',
            });
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
            setInfo({
                typeOfInfo: 'bad',
                message: 'Something went wrong!',
                icon: '👻',
            });
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
                <div className="relative w-5/6 sm:w-2/3 lg:w-1/4 px-4  bg-white shadow-lg p-4 md:p-8 rounded lg:rounded-lg">
                    <button
                        onClick={handleCloseButtonClick}
                        className="absolute top-4 right-4"
                    >
                        <FaTimes />
                    </button>
                    <SignupForm
                        handleSubmit={handleSubmit}
                        isSubmitting={isSubmitting}
                    />
                </div>
            </div>
        </motion.div>
    );
}
