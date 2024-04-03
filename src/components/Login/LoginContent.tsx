import { useEffect, useRef, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useInfoCard from '../../hooks/useInfoCard';
import { displayErrorInfo } from '../UiElements/UserNotification/displayErrorInfo';
import { InfoType } from '../../types/infoTypes';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import LoginPage from './LoginPage';
import InfoCard from '../UiElements/InfoCard/InfoCard';
import FullscreenLoading from '../UiElements/LoadingSpinner/FullscreenLoading';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * React component representing the app content when the user is not logged in.
 *
 * @component
 * @returns {JSX.Element} JSX Element representing the login content.
 */
export default function LoginContent(): JSX.Element {
    const { setToken } = useAuth();
    const { info, setInfo } = useInfoCard();

    const [loading, setLoading] = useState<boolean>(false);

    const shouldHandleOAuthCallback = useRef(true);
    const params = new URLSearchParams(location.search);
    const provider = params.get('provider');
    const code = params.get('code');

    const handleOAuthCallback = async () => {
        if (!provider || !code) return;
        try {
            setLoading(true);
            const SERVER_URL = import.meta.env.VITE_SERVER_URL;

            const response = await fetch(
                `${SERVER_URL}/api/v1/oauth/redirect?provider=${provider}&code=${code}`,
                {
                    method: 'GET',
                }
            );

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
            const failedInfo = {
                typeOfInfo: 'bad',
                message: 'OAuth login failed.',
                icon: '👻',
            };

            setInfo(failedInfo as InfoType);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (shouldHandleOAuthCallback.current) handleOAuthCallback();

        return () => {
            shouldHandleOAuthCallback.current = false;
        };
    }, [code]);

    /**
     * Content for the loading screen.
     *
     * @type {JSX.Element}
     */

    const LoadingScreen = (
        <AnimatePresence>
            <motion.div
                key="verifying"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <FullscreenLoading message={'Verifying user data'} />
            </motion.div>
        </AnimatePresence>
    );

    /**
     * Content for the login screen.
     *
     * @type {JSX.Element}
     */
    const LoginScreen = (
        <>
            <Routes>
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/" element={<LoginPage />} />
            </Routes>
            <InfoCard info={info} />
        </>
    );

    return loading ? LoadingScreen : LoginScreen;
}
