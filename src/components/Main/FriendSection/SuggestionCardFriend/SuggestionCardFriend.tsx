import { useState } from 'react';
import { FriendsOfFriendsType } from '../../../../types/friendTypes';
import { TbDotsDiagonal, TbFoldUp } from 'react-icons/tb';
import { motion } from 'framer-motion';
import SuggestionCardFriendMenu from './SuggestionCardFriendMenu/SuggestionCardFriendMenu';
import SuggestionCardFriendInfo from './SuggestionCardFriendInfo/SuggestionCardFriendInfo';

type SuggestionCardFriendProps = {
    friendData: FriendsOfFriendsType;
};

export default function SuggestionCardFriend({
    friendData,
}: SuggestionCardFriendProps) {
    const { userpic, firstName, lastName, _id, commonFriends } = friendData;

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

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

    const MenuOpenContent = <SuggestionCardFriendMenu id={_id} />;

    const MenuClosedContent = (
        <SuggestionCardFriendInfo
            userpic={userpic}
            firstName={firstName}
            lastName={lastName}
            commonFriends={commonFriends}
        />
    );

    return (
        <div
            className={`relative w-48 md:w-40 h-60 flex flex-col justify-between text-center p-4 gap-4 bg-card dark:bg-cardDark shadow-lg rounded md:rounded-lg overflow-hidden ${
                showMenu
                    ? 'bg-friendSuggestionCardHighlight dark:bg-friendSuggestionCardHighlight'
                    : ''
            } `}
        >
            <div className="group">
                <button
                    onClick={toggleMenu}
                    className="cursor-pointer absolute top-0 right-0 h-12 w-12 rounded bg-friendSuggestionCardHighlight dark:bg-friendSuggestionCardHighlight rounded-es-full transform transition-all duration-300 hover:w-72 hover:h-72 group-hover:w-72 group-hover:h-72"
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
