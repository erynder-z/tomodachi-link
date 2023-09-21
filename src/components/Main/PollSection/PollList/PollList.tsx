import React, { useEffect, useRef, useState } from 'react';
import LoadingSpinner from '../../../UiElements/LoadingSpinner/LoadingSpinner';

import { motion } from 'framer-motion';

type PollListProps = {
    isPaginationTriggered: boolean;
};

export default function PollList({ isPaginationTriggered }: PollListProps) {
    const [loading, setLoading] = useState<boolean>(true);

    const shouldInitialize = useRef(true);

    useEffect(() => {
        if (shouldInitialize.current) {
            console.log('fetching');
            setLoading(false);
        }
        return () => {
            shouldInitialize.current = false;
        };
    }, []);

    const LoadingContent = (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex min-h-[calc(100vh_-_3rem)] lg:min-h-full md:p-4 lg:w-full justify-center items-center shadow-lg bg-card dark:bg-cardDark"
        >
            <LoadingSpinner message="Getting polls" />
        </motion.div>
    );

    const PollListContent = (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col just min-h-[calc(100vh_-_3rem)] lg:min-h-full lg:p-4 md:p-0 pb-4 bg-background2 dark:bg-background2Dark text-regularText dark:text-regularTextDark shadow-lg rounded lg:rounded-lg"
        >
            <h1 className="text-center text-xl font-bold mb-4">Poll list</h1>
            Something
        </motion.div>
    );

    return loading ? LoadingContent : PollListContent;
}
