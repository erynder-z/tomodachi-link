import { useContext } from 'react';
import InfoOverlayContext from '../../../contexts/InfoOverlayContext';
import { FaExclamationTriangle, FaTimes, FaRegSmile } from 'react-icons/fa';
import SignupForm from './SignupForm';

type Props = {
    setShowSignup: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SignupPage({ setShowSignup }: Props) {
    const { setInfo } = useContext(InfoOverlayContext);

    const signup = async (
        firstName: string,
        lastName: string,
        email: string,
        username: string,
        password: string,
        confirm_password: string
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
                    confirm_password,
                }),
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
                message: 'Registration successful!',
                icon: <FaRegSmile />,
            });
        } catch (error: unknown) {
            console.error(error);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

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
            '[name="confirm_password"]'
        ) as HTMLInputElement;

        const firstName = firstNameInput.value;
        const lastName = lastNameInput.value;
        const email = emailInput.value;
        const username = usernameInput.value;
        const password = passwordInput.value;
        const confirm_password = confirmPasswordInput.value;

        try {
            await signup(
                firstName,
                lastName,
                email,
                username,
                password,
                confirm_password
            );
        } catch (error) {
            setInfo({
                message: 'Something went wrong!',
                icon: <FaExclamationTriangle />,
            });
        }
    };

    const handleCloseButtonClick = () => {
        setShowSignup(false);
    };

    return (
        <div className="fixed inset-0 z-50 bg-card flex justify-center items-center bg-opacity-80">
            <div className="flex justify-center items-center w-full h-full">
                <div className="relative w-5/6 sm:w-2/3 lg:w-1/3 px-4 lg:py-10 bg-white shadow-lg sm:rounded-3xl sm:p-10">
                    <button
                        onClick={handleCloseButtonClick}
                        className="absolute top-4 right-4"
                    >
                        <FaTimes />
                    </button>
                    <SignupForm handleSubmit={handleSubmit} />
                </div>
            </div>
        </div>
    );
}
