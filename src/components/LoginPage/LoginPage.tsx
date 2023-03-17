import { useContext, useState } from 'react';
import AuthContext from '../../contexts/AuthContext';
import InfoOverlayContext from '../../contexts/InfoOverlayContext';
import LoginForm from './LoginForm';
import VerifyingInfoBox from './VerifyingInfoBox';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function LoginPage() {
    const { setToken } = useContext(AuthContext);
    const { setInfo } = useContext(InfoOverlayContext);
    const [isVerifying, setIsVerifying] = useState<boolean>(false);

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
                message: 'Something went wrong!',
                icon: <FaExclamationTriangle />,
            });
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="flex justify-center items-center w-full h-full">
                <div className="flex justify-center items-center h-1/2 w-4/5 sm:w-1/2 lg:w-1/3 px-4 lg:py-10 bg-white shadow-lg sm:rounded-3xl sm:p-10">
                    {isVerifying ? (
                        <VerifyingInfoBox />
                    ) : (
                        <LoginForm handleSubmit={handleSubmit} />
                    )}
                </div>
            </div>
        </div>
    );
}
