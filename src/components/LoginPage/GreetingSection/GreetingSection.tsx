import React, { useEffect, useState } from 'react';
import { countUsers } from '../../../utilities/countUsers';
import useInfoCard from '../../../hooks/useInfoCard';

export default function GreetingSection() {
    const { setInfo } = useInfoCard();
    const [numberOfUsers, setNumberOfUsers] = useState<number>(0);

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
        const response = await countUsers(setInfo);
        animateCount(0, response, 500);
    };

    useEffect(() => {
        getNumberOfUsers();
    }, []);

    return (
        <section className="text-white font-bold font-mono md:text-3xl text-center bg-cBlack/75 p-4 lg:rounded-full w-5/6 mx-auto">
            <h1>Welcome to Odin-Book!</h1>
            Join our community of{' '}
            <span className="text-cCyan">{formattedNumberOfUsers}</span> users!
        </section>
    );
}
