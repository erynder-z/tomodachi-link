import React from 'react';
import { TbLink, TbUserMinus, TbMessage } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

type FriendCardMenuProps = {
    id: string;
    firstName: string;
    handleUnfriendButtonClick: () => void;
};

export default function FriendCardMenu({
    id,
    firstName,
    handleUnfriendButtonClick,
}: FriendCardMenuProps) {
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
            <Link
                to={`/chat/`}
                className="flex justify-between items-center w-full text-left text-regularText dark:text-regularTextDark group"
            >
                <span className="group-hover:text-yellow-300 group-hover:dark:text-yellow-300 transition-all leading-tight">
                    Chat with {firstName}
                </span>
                <div className="flex items-center h-8 gap-4 py-2 text-regularText dark:text-regularTextDark text-xl group-hover:text-yellow-300 group-hover:dark:text-yellow-300 transition-all">
                    <TbMessage />
                </div>
            </Link>
            <button
                className="flex justify-between items-center w-full text-left cursor-pointer group"
                onClick={handleUnfriendButtonClick}
            >
                <span className="group-hover:text-yellow-300 group-hover:dark:text-yellow-300 transition-all">
                    Unfriend
                </span>
                <TbUserMinus className="h-8 text-regularText dark:text-regularTextDark text-xl group-hover:text-yellow-300 group-hover:dark:text-yellow-300 transition-all" />
            </button>
        </motion.div>
    );
}
