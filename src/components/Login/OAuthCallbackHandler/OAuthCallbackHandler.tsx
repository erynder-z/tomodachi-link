import { useLocation, useNavigate } from 'react-router-dom';
import { displayErrorInfo } from '../../UiElements/UserNotification/displayErrorInfo';
import useInfoCard from '../../../hooks/useInfoCard';
import { useEffect, useRef } from 'react';
import useAuth from '../../../hooks/useAuth';
import FullscreenLoading from '../../UiElements/LoadingSpinner/FullscreenLoading';
import { AnimatePresence, motion } from 'framer-motion';

export default function OAuthCallbackHandler() {
    const { setInfo } = useInfoCard();
    const { setToken } = useAuth();

    const shouldFetch = useRef(true);
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const provider = params.get('provider');
    const code = params.get('code');

    const exchangeCodeForToken = async () => {
        try {
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
        } finally {
            shouldFetch.current = false;
            navigate('/');
        }
    };

    useEffect(() => {
        if (shouldFetch.current) exchangeCodeForToken();

        return () => {
            shouldFetch.current = false;
        };
    }, []);

    return (
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
}
