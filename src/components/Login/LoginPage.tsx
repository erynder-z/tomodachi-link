import { useContext, useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import AuthContext from '../../contexts/AuthContext';
import LoginForm from './LoginForm';
import SignupPage from './SignupPage/SignupPage';
import useInfoCard from '../../hooks/useInfoCard';
import VerifyingInfoBox from './VerifyingInfoBox';
import { generateAsciiImage } from '../../utilities/generateAsciiImage';
import { introBackground } from '../../assets/intro';
import useAuth from '../../hooks/useAuth';
import GreetingSection from './GreetingSection/GreetingSection';
import RegisterButton from './RegisterButton/RegisterButton';
import GuestLoginButton from './GuestLoginButton/GuestLoginButton';
import { motion, AnimatePresence } from 'framer-motion';
import { displayErrorInfo } from '../UiElements/UserNotification/displayErrorInfo';
import GithubLoginButton from './GithubLoginButton/GithubLoginButton';
import GoogleLoginButton from './GoogleLoginButton/GoogleLoginButton';
import DiscordLoginButton from './DiscordLoginButton/DiscordLoginButton';

/**
 * Renders the login page component.
 *
 * @component
 * @returns {JSX.Element} The rendered login page component.
 */
export default function LoginPage(): JSX.Element {
    const { setToken } = useContext(AuthContext);
    const { isAuth } = useAuth();
    const { setInfo } = useInfoCard();
    const [cookies, setCookie, removeCookie] = useCookies(['jwtTomodachiLink']);
    const [isVerifying, setIsVerifying] = useState<boolean>(false);
    const [showSignup, setShowSignup] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const shouldRenderAscii = useRef(true);

    /**
     * Authenticates the user with the provided username and password.
     *
     * @param {string} username - The username of the user.
     * @param {string} password - The password of the user.
     * @return {Promise<void>} - A promise that resolves once the user is authenticated.
     */
    const login = async (username: string, password: string): Promise<void> => {
        setIsVerifying(true);
        setInfo(null);

        try {
            const SERVER_URL = import.meta.env.VITE_SERVER_URL;
            const response = await fetch(`${SERVER_URL}/api/v1/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const data = await response.json();
                const errorMessage = data.error.message;
                displayErrorInfo(setInfo, errorMessage, '👻');

                throw new Error(
                    `Error: ${response.status} ${response.statusText}`
                );
            }

            const data = await response.json();
            setToken(data.token);
        } catch (error: unknown) {
            console.error(error);
            setIsVerifying(false);
        }
    };
    /**
     * Handles the login submission.
     *
     * @function
     * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
     * @returns {Promise<void>}
     */
    const handleLoginSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();

        setIsSubmitting(true);

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
            displayErrorInfo(setInfo, 'Something went wrong!', '👻');
        }
        setIsSubmitting(false);
    };
    /**
     * Handles the click on the register button.
     *
     * @function
     * @return {void} No return value.
     */
    const handleRegisterClick = (): void => setShowSignup(true);

    /**
     * Handles the guest login.
     *
     * @function
     * @returns {Promise<void>}
     */
    const handleGuestLogin = async (): Promise<void> => {
        setIsSubmitting(true);

        const serverURL = import.meta.env.VITE_SERVER_URL;
        const response = await fetch(`${serverURL}/api/v1/guest`);
        const data = await response.json();

        const guestUsername = data.guestLoginData.username;
        const guestPassword = data.guestLoginData.password;

        try {
            await login(guestUsername, guestPassword);
        } catch (error) {
            displayErrorInfo(setInfo, 'Something went wrong!', '👻');
        }
        setIsSubmitting(false);
    };

    /**
     * Effect to handle the removal of cookies and setting the token.
     *
     * @effect
     * @return {void} No return value.
     */
    useEffect(() => {
        const setTokenAndDeleteCookie = () => {
            setCookie('jwtTomodachiLink', cookies.jwtTomodachiLink, {
                secure: true,
                sameSite: 'strict',
            });
            const token = cookies.jwtTomodachiLink;

            setToken(token);
            removeCookie('jwtTomodachiLink');
        };
        if (cookies.jwtTomodachiLink) setTokenAndDeleteCookie();
    }, [cookies.jwtTomodachiLink, setToken, removeCookie, setInfo]);

    /**
     * Effect to update the verifying status when authentication changes.
     *
     * @effect
     * @param {boolean} isAuth - The authentication status.
     * @return {void} No return value.
     */
    useEffect(() => {
        if (isAuth) setIsVerifying(false);
    }, [isAuth]);

    /**
     * Effect to render ASCII art background on component mount.
     *
     * @effect
     * @param {React.MutableRefObject<boolean>} shouldRenderAscii - Ref indicating whether to render ASCII art.
     * @return {void} No return value.
     */
    useEffect(() => {
        if (shouldRenderAscii.current)
            generateAsciiImage(introBackground, 'asciiArtCanvas', 15);

        return () => {
            shouldRenderAscii.current = false;
        };
    }, []);

    /**
     * Content for the showSignup state.
     *
     * @type {JSX.Element}
     */
    const SignupContent: JSX.Element = (
        <SignupPage setShowSignup={setShowSignup} />
    );

    /**
     * The AsciiBackground.
     *
     * @type {JSX.Element}
     */
    const AsciiBackground: JSX.Element = (
        <div className="absolute inset-0 z-0">
            <canvas
                id="asciiArtCanvas"
                className="h-full w-full object-cover"
            ></canvas>
        </div>
    );

    /**
     * Content for the Login.
     *
     * @type {JSX.Element}
     */
    const LoginContent: JSX.Element = (
        <>
            <motion.div
                key="greeting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <GreetingSection />
            </motion.div>
            <motion.div
                key="loginForm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className=" w-5/6 md:w-1/2 mx-auto  bg-white shadow-lg p-4 lg:p-8 rounded lg:rounded-lg h-90 md:h-6/8"
            >
                {isVerifying ? (
                    <VerifyingInfoBox />
                ) : (
                    <>
                        <LoginForm
                            handleLoginSubmit={handleLoginSubmit}
                            isSubmitting={isSubmitting}
                        />
                        <div className="flex flex-col w-full gap-4">
                            <GuestLoginButton
                                handleGuestLogin={handleGuestLogin}
                                isSubmitting={isSubmitting}
                            />
                            <span>OAuth Login</span>
                            <div className="flex justify-between gap-2">
                                <GithubLoginButton
                                    isSubmitting={isSubmitting}
                                />
                                <GoogleLoginButton
                                    isSubmitting={isSubmitting}
                                />
                                <DiscordLoginButton
                                    isSubmitting={isSubmitting}
                                />
                            </div>
                            <span className="mt-2 md:mt-8">
                                Don't have an account?
                            </span>
                            <RegisterButton
                                handleRegisterClick={handleRegisterClick}
                            />
                        </div>
                    </>
                )}
            </motion.div>
        </>
    );

    /**
     * Renders the LoginPage component.
     *
     * @return {JSX.Element} The rendered LoginPage component.
     */
    return (
        <div className="h-screen bg-cBlack overflow-auto font-regularFont subpixel-antialiased">
            {AsciiBackground}
            <div className="flex flex-col lg:grid lg:grid-cols-2 justify-center items-center w-full md:h-screen gap-4 relative z-10 my-2 md:m-0">
                <AnimatePresence>
                    {showSignup ? SignupContent : LoginContent}
                </AnimatePresence>
            </div>
        </div>
    );
}
