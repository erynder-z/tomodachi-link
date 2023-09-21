import React from 'react';
import { motion } from 'framer-motion';
import { MdAddChart, MdInsights } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function PollSectionSelect() {
    return (
        <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-4 min-h-[calc(100vh_-_3rem)] lg:min-h-full lg:p-4 md:p-0 pb-4 bg-background2 dark:bg-background2Dark text-regularText dark:text-regularTextDark shadow-lg rounded lg:rounded-lg"
        >
            <h1 className="text-center text-xl font-bold mb-4">
                Select your poison
            </h1>
            <div className="flex justify-center gap-8 my-auto">
                <Link
                    to="/polls/new"
                    className="flex justify-center items-center gap-4 w-60 h-60 bg-button dark:bg-buttonDark hover:bg-buttonHover dark:hover:bg-buttonDarkHover text-regularText dark:text-regularTextDark rounded"
                >
                    <MdAddChart size="2em" />
                    Create new poll
                </Link>
                <Link
                    to="/polls/list"
                    className="flex justify-center items-center gap-4 w-60 h-60 bg-button dark:bg-buttonDark hover:bg-buttonHover dark:hover:bg-buttonDarkHover text-regularText dark:text-regularTextDark rounded"
                >
                    <MdInsights size="2em" /> View polls
                </Link>
            </div>
        </motion.div>
    );
}
