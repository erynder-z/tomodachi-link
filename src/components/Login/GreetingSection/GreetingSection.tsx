import { useEffect, useRef, useState } from 'react';
import useInfoCard from '../../../hooks/useInfoCard';
import { backendFetch } from '../../../utilities/backendFetch';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

export default function GreetingSection() {
    const { setInfo } = useInfoCard();
    const [numberOfUsers, setNumberOfUsers] = useState<number>(0);

    const shouldGetNumberOfUsers = useRef(true);

    const API_ENDPOINT_URL = '/api/v1/users/count';
    const METHOD = 'GET';
    const ERROR_MESSAGE = 'Unable to fetch number of users!';

    const getNumberOfUsers = async () => {
        const token = undefined;
        const response = await backendFetch(
            token,
            setInfo,
            API_ENDPOINT_URL,
            METHOD,
            ERROR_MESSAGE
        );
        setNumberOfUsers(response?.numberOfUsers);
    };

    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);

    useEffect(() => {
        if (numberOfUsers !== 0) {
            const animation = animate(count, numberOfUsers, { duration: 1 });

            return animation.stop;
        }
    }, [numberOfUsers]);

    useEffect(() => {
        if (shouldGetNumberOfUsers.current) getNumberOfUsers();

        return () => {
            shouldGetNumberOfUsers.current = false;
        };
    }, []);

    return (
        <section className="text-white font-bold font-mono md:text-3xl text-center bg-cBlack/75 p-4 lg:rounded-full w-5/6 mx-auto">
            <h1>Welcome to Odin-Book!</h1>
            Join our community of{' '}
            <motion.span className="text-cCyan">{rounded}</motion.span> users!
        </section>
    );
}
