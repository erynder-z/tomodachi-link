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
        const interval = 10;
        const steps = Math.ceil(duration / interval);
        const stepValue = (to - from) / steps;

        let currentCount = from;
        const animation = setInterval(() => {
            currentCount += stepValue;
            setNumberOfUsers(Math.round(currentCount));

            if (Math.round(currentCount) >= to) {
                clearInterval(animation);
            }
        }, interval);
    };

    const getNumberOfUsers = async () => {
        const token = undefined;
        const apiEndpointURL = '/api/v1/users/count';
        const method = 'GET';
        const errorMessage = 'Unable to fetch number of users!';
        const response = await backendFetch(
            token,
            setInfo,
            apiEndpointURL,
            method,
            errorMessage
        );
        animateCount(0, response?.numberOfUsers, 500);
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
