import { useContext, useState } from 'react';
import AuthContext from '../../contexts/AuthContext';
import LoginForm from './LoginForm';
import { FaExclamationTriangle } from 'react-icons/fa';
import SignupPage from './SignupPage/SignupPage';
import useInfoCard from '../../hooks/useInfoCard';
import { getTimeOfDayMessage } from '../../utilities/getTimeOfDayMessage';
import FullscreenLoading from '../LoadingSpinner/FullscreenLoading';
import VerifyingInfoBox from './VerifyingInfoBox';

export default function LoginPage() {
    const { setToken } = useContext(AuthContext);
    const [isVerifying, setIsVerifying] = useState<boolean>(false);
    const [showSignup, setShowSignup] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

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
        }

        setIsVerifying(false);
        setLoading(true);
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
        const timeOfDayMessage = getTimeOfDayMessage();

        try {
            await login(username, password);
            setInfo({
                typeOfInfo: timeOfDayMessage.typeOfInfo,
                message: timeOfDayMessage.message,
                icon: timeOfDayMessage.icon,
            });
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

    if (loading) {
        return <FullscreenLoading message={'Getting things ready!'} />;
    }

    return (
        <div className="h-screen  bg-card">
            <div className="flex justify-center items-center w-full h-full">
                <div className="h-1/2 w-5/6 sm:w-2/3 lg:w-1/3 px-4 lg:py-10 bg-white shadow-lg sm:p-10">
                    {isVerifying ? (
                        <VerifyingInfoBox />
                    ) : (
                        <>
                            <LoginForm handleSubmit={handleSubmit} />
                            <div className="flex w-full">
                                <button
                                    onClick={handleRegisterClick}
                                    className="w-full relative overflow-hidden bg-green-500 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out group"
                                >
                                    <span className="z-10 relative">
                                        Register
                                    </span>
                                    <span className="absolute top-0 left-0 h-full w-full bg-green-600 transform -translate-x-full transition duration-300 ease-in-out group-hover:translate-x-0"></span>
                                </button>
                            </div>
                        </>
                    )}
                </div>
                {showSignup && <SignupPage setShowSignup={setShowSignup} />}
            </div>
        </div>
    );
}
