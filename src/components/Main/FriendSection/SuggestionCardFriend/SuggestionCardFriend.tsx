import { useState } from 'react';
import { FriendsOfFriendsType } from '../../../../types/friendTypes';
import { TbDotsDiagonal, TbFoldUp } from 'react-icons/tb';
import { motion } from 'framer-motion';
import SuggestionCardFriendMenu from './SuggestionCardFriendMenu/SuggestionCardFriendMenu';
import SuggestionCardFriendInfo from './SuggestionCardFriendInfo/SuggestionCardFriendInfo';

type SuggestionCardFriendProps = {
    friendData: FriendsOfFriendsType;
};

/**
 * SuggestionCardFriend component to display a suggestion card for a friend.
 *
 * @component
 * @param {SuggestionCardFriendProps} props - The props object.
 * @param {FriendsOfFriendsType} props.friendData - Data of the suggested friend.
 * @return {JSX.Element} The rendered SuggestionCardFriend component.
 */
export default function SuggestionCardFriend({
    friendData,
}: SuggestionCardFriendProps): JSX.Element {
    const { userpic, firstName, lastName, _id, commonFriends } = friendData;

    const [showMenu, setShowMenu] = useState(false);

    /**
     * Toggle function to switch the visibility of the friend menu.
     *
     * @function
     * @return {void} No return value.
     */
    const toggleMenu = (): void => {
        setShowMenu(!showMenu);
    };

    /**
     * Icon to be displayed when the friend menu is open.
     *
     * @type {JSX.Element}
     */
    const MenuOpenIcon: JSX.Element = (
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
            <TbFoldUp className="group-hover:scale-150 duration-300" />
        </motion.div>
    );

    /**
     * Icon to be displayed when the friend menu is closed.
     *
     * @type {JSX.Element}
     */
    const MenuClosedIcon: JSX.Element = (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <TbDotsDiagonal className="group-hover:scale-150 duration-300" />
        </motion.div>
    );

    /**
     * JSX element representing the content of the friend menu when it is open.
     *
     * @type {JSX.Element}
     */
    const MenuOpenContent: JSX.Element = <SuggestionCardFriendMenu id={_id} />;

    /**
     * JSX element representing the content of the friend menu when it is closed.
     *
     * @type {JSX.Element}
     */
    const MenuClosedContent: JSX.Element = (
        <SuggestionCardFriendInfo
            userpic={userpic}
            firstName={firstName}
            lastName={lastName}
            commonFriends={commonFriends}
        />
    );

    /**
     * JSX element representing the SuggestionCardFriend component.
     *
     * @type {JSX.Element}
     */
    return (
        <div
            className={`relative w-48 md:w-40 h-60 flex flex-col justify-between text-center p-4 gap-4 bg-card dark:bg-cardDark text-regularText dark:regularTextDark shadow-lg rounded md:rounded-lg overflow-hidden ${
                showMenu
                    ? 'bg-friendSuggestionCardHighlight dark:bg-friendSuggestionCardHighlightDark'
                    : ''
            } `}
        >
            <div className="group">
                <button
                    onClick={toggleMenu}
                    className="cursor-pointer absolute top-0 right-0 h-12 w-12 rounded bg-friendSuggestionCardHighlight dark:bg-friendSuggestionCardHighlightDark text-regularText dark:text-regularTextDark rounded-es-full transform transition-all duration-300 hover:w-72 hover:h-72 group-hover:w-72 group-hover:h-72"
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
