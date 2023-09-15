import React, { useState } from 'react';
import { TbDotsDiagonal, TbFoldUp } from 'react-icons/tb';
import { motion } from 'framer-motion';
import SuggestionCardRandomMenu from './SuggestionCardRandomMenu/SuggestionCardRandomMenu';
import SuggestionCardRandomInfo from './SuggestionCardRandomInfo/SuggestionCardRandomInfo';
import { MinimalUserTypes } from '../../../../types/minimalUserTypes';

type SuggestionCardRandomProps = {
    userData: MinimalUserTypes;
};

export default function SuggestionCardRandom({
    userData,
}: SuggestionCardRandomProps) {
    const { userpic, firstName, lastName, _id } = userData;

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => setShowMenu(!showMenu);

    const MenuOpenIcon = (
        <motion.div
            initial={{
                opacity: 0,
                rotate: 0,
            }}
            animate={{
                opacity: 1,
                rotate: 45,
            }}
            transition={{ duration: 0.3 }}
        >
            <TbFoldUp />
        </motion.div>
    );

    const MenuClosedIcon = (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <TbDotsDiagonal />
        </motion.div>
    );

    const MenuOpenContent = <SuggestionCardRandomMenu id={_id} />;

    const MenuClosedContent = (
        <SuggestionCardRandomInfo
            userpic={userpic}
            firstName={firstName}
            lastName={lastName}
        />
    );

    return (
        <div
            className={`relative w-48 md:w-40 h-60 flex flex-col justify-between text-center p-4 gap-4 bg-card dark:bg-cardDark shadow-lg rounded md:rounded-lg overflow-hidden ${
                showMenu
                    ? 'bg-friendRandomCardHighlight dark:bg-friendRandomCardHighlight'
                    : ''
            } `}
        >
            <div className="group">
                <button
                    onClick={toggleMenu}
                    className="cursor-pointer absolute top-0 right-0 h-12 w-12 rounded bg-friendRandomCardHighlight dark:bg-friendRandomCardHighlight rounded-es-full transform transition-all duration-300 hover:w-72 hover:h-72 group-hover:w-72 group-hover:h-72"
                >
                    <div className="absolute top-3 right-3 z-10 group-hover:scale-110 transform transition-all duration-300">
                        {showMenu ? MenuOpenIcon : MenuClosedIcon}
                    </div>
                </button>
            </div>
            <div className="z-10 h-full w-full flex flex-col justify-center">
                {showMenu ? MenuOpenContent : MenuClosedContent}
            </div>
        </div>
    );
}
