import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../contexts/AuthContext';
import LoginForm from './LoginForm';
import { FaExclamationTriangle } from 'react-icons/fa';
import SignupPage from './SignupPage/SignupPage';
import useInfoCard from '../../hooks/useInfoCard';
import VerifyingInfoBox from './VerifyingInfoBox';
import { generateAsciiImage } from '../../utilities/generateAsciiImage';
import { introBackground } from '../../assets/intro';
import useAuth from '../../hooks/useAuth';

export default function LoginPage() {
    const { setToken } = useContext(AuthContext);
    const { isAuth } = useAuth();

    const [isVerifying, setIsVerifying] = useState<boolean>(false);
    const [showSignup, setShowSignup] = useState<boolean>(false);

    const { setInfo } = useInfoCard();

    const login = async (username: string, password: string) => {
        setIsVerifying(true);
        setInfo(null);

        try {
            const serverURL = import.meta.env.VITE_SERVER_URL;
            const response = await fetch(`${serverURL}/api/v1/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const data = await response.json();
                const errorMessage = data.error.message;

                setInfo({
                    typeOfInfo: 'bad',
                    message: errorMessage,
                    icon: <FaExclamationTriangle />,
                });

                throw new Error(
                    `Error: ${response.status} ${response.statusText}`
                );
            }

            const data = await response.json();
            localStorage.setItem('jwtOdinBook', data.token);
            setToken(data.token);
        } catch (error: unknown) {
            console.error(error);
            setIsVerifying(false);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const usernameInput = event.currentTarget.querySelector(
            '[name="username"]'
        ) as HTMLInputElement;

        const passwordInput = event.currentTarget.querySelector(
            '[name="password"]'
        ) as HTMLInputElement;

        const username = usernameInput.value;
        const password = passwordInput.value;

        try {
            await login(username, password);
        } catch (error) {
            setInfo({
                typeOfInfo: 'bad',
                message: 'Something went wrong!',
                icon: <FaExclamationTriangle />,
            });
        }
    };

    const handleRegisterClick = () => {
        setShowSignup(true);
    };

    useEffect(() => {
        if (isAuth) {
            setIsVerifying(false);
        }
    }, [isAuth]);

    useEffect(() => {
        generateAsciiImage(introBackground, 'asciiArtCanvas', 15);
    }, []);

    return (
        <div className="h-screen bg-cBlack">
            <div className="absolute inset-0 z-0">
                <canvas
                    id="asciiArtCanvas"
                    className="h-full w-full object-cover"
                ></canvas>
            </div>
            <div className="flex justify-center items-center w-full h-full relative z-10">
                {showSignup ? (
                    <SignupPage setShowSignup={setShowSignup} />
                ) : (
                    <div className="animate-inAnimation h-3/5 w-5/6 sm:w-2/3 lg:w-1/4 px-4 lg:py-10 bg-white shadow-lg sm:p-10">
                        {isVerifying ? (
                            <VerifyingInfoBox />
                        ) : (
                            <>
                                <LoginForm handleSubmit={handleSubmit} />
                                <div className="flex w-full">
                                    <button
                                        onClick={handleRegisterClick}
                                        className="w-full relative overflow-hidden bg-green-500 text-white text-xl font-bold py-2 px-4 rounded transition duration-300 ease-in-out group"
                                    >
                                        <span className="z-10 relative">
                                            Create account
                                        </span>
                                        <span className="absolute top-0 left-0 h-full w-full bg-green-600 transform -translate-x-full transition duration-300 ease-in-out group-hover:translate-x-0"></span>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
