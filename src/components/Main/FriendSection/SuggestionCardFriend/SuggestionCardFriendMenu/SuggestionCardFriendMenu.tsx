import React from 'react';
import { TbLink, TbUserPlus } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

type SuggestionCardFriendMenuProps = {
    id: string;
};

export default function SuggestionCardFriendMenu({
    id,
}: SuggestionCardFriendMenuProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-2 justify-around items-center"
        >
            <Link
                to={`/users/${id}`}
                className="flex justify-between items-center w-full text-left text-regularText dark:text-regularTextDark group"
            >
                <span className="group-hover:text-yellow-300 group-hover:dark:text-yellow-300 transition-all">
                    Visit page
                </span>
                <div className="flex items-center h-8 gap-4 py-2 text-regularText dark:text-regularTextDark text-xl group-hover:text-yellow-300 group-hover:dark:text-yellow-300 transition-all">
                    <TbLink />
                </div>
            </Link>
            <button className="flex justify-between items-center w-full text-left text-regularText dark:text-regularTextDark group leading-tight">
                <span className="group-hover:text-yellow-300 group-hover:dark:text-yellow-300 transition-all">
                    Send friend request
                </span>
                <div className="flex items-center h-8 gap-4 py-2 text-regularText dark:text-regularTextDark text-xl group-hover:text-yellow-300 group-hover:dark:text-yellow-300 transition-all">
                    <TbUserPlus />
                </div>
            </button>
        </motion.div>
    );
}
