import { useState } from 'react';
import { TbDotsDiagonal, TbFoldUp } from 'react-icons/tb';
import { motion } from 'framer-motion';
import SuggestionCardRandomMenu from './SuggestionCardRandomMenu/SuggestionCardRandomMenu';
import SuggestionCardRandomInfo from './SuggestionCardRandomInfo/SuggestionCardRandomInfo';
import { MinimalUserTypes } from '../../../../types/otherUserTypes';

type SuggestionCardRandomProps = {
    userData: MinimalUserTypes;
};

/**
 * SuggestionCardRandom component for displaying a random user suggestion card.
 *
 * @component
 * @param {SuggestionCardRandomProps} props - The props object.
 * @param {MinimalUserTypes} props.userData - The user data for the suggestion.
 * @return {JSX.Element} The rendered SuggestionCardRandom component.
 */
export default function SuggestionCardRandom({
    userData,
}: SuggestionCardRandomProps): JSX.Element {
    const { userpic, firstName, lastName, _id } = userData;

    const [showMenu, setShowMenu] = useState(false);

    /**
     * Function to toggle the menu visibility.
     *
     * @function
     * @name toggleMenu
     */
    const toggleMenu = () => setShowMenu(!showMenu);

    /**
     * JSX element representing the icon for an open menu.
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
     * JSX element representing the icon for a closed menu.
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
     * JSX element representing the content for an open menu.
     *
     * @type {JSX.Element}
     */
    const MenuOpenContent: JSX.Element = <SuggestionCardRandomMenu id={_id} />;

    /**
     * JSX element representing the content for a closed menu.
     *
     * @type {JSX.Element}
     */
    const MenuClosedContent: JSX.Element = (
        <SuggestionCardRandomInfo
            userpic={userpic}
            firstName={firstName}
            lastName={lastName}
        />
    );

    /**
     * The rendered SuggestionCardRandom component.
     *
     * @type {JSX.Element}
     */
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
