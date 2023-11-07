import { useEffect, useRef, useState } from 'react';
import useInfoCard from '../../../hooks/useInfoCard';
import { backendFetch } from '../../../utilities/backendFetch';

export default function GreetingSection() {
    const { setInfo } = useInfoCard();
    const [numberOfUsers, setNumberOfUsers] = useState<number>(0);

    const shouldGetNumberOfUsers = useRef(true);

    const formattedNumberOfUsers = numberOfUsers.toLocaleString(undefined, {
        minimumIntegerDigits: 4,
        useGrouping: false,
    });

    const animateCount = (from: number, to: number, duration: number) => {
        const ANIMATION_INTERVAL = 10;
        const steps = Math.ceil(duration / ANIMATION_INTERVAL);
        const stepValue = (to - from) / steps;

        let currentCount = from;
        const animation = setInterval(() => {
            currentCount += stepValue;
            setNumberOfUsers(Math.round(currentCount));

            if (Math.round(currentCount) >= to) {
                clearInterval(animation);
            }
        }, ANIMATION_INTERVAL);
    };

    const API_ENDPOINT_URL = '/api/v1/users/count';
    const METHOD = 'GET';
    const ERROR_MESSAGE = 'Unable to fetch number of users!';

    const ANIMATION_DURATION = 500;

    const getNumberOfUsers = async () => {
        const token = undefined;
        const response = await backendFetch(
            token,
            setInfo,
            API_ENDPOINT_URL,
            METHOD,
            ERROR_MESSAGE
        );
        animateCount(0, response?.numberOfUsers, ANIMATION_DURATION);
    };

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
            <span className="text-cCyan">{formattedNumberOfUsers}</span> users!
        </section>
    );
}
