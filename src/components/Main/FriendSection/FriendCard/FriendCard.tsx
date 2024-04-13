import { useState } from 'react';
import { MinimalUserTypes } from '../../../../types/otherUserTypes';
import useAuth from '../../../../hooks/useAuth';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';
import useInfoCard from '../../../../hooks/useInfoCard';
import useDelayUnmount from '../../../../hooks/useDelayUnmount';
import ConfirmationOverlay from '../../../UiElements/Overlays/ConfirmationOverlay/ConfirmationOverlay';
import useFriendData from '../../../../hooks/useFriendData';
import FriendInfoCard from './FriendInfoCard/FriendInfoCard';
import FriendCardMenu from './FriendCardMenu/FriendCardMenu';
import { TbDotsDiagonal, TbFoldUp } from 'react-icons/tb';
import { motion } from 'framer-motion';
import { ChatConversationType } from '../../../../types/chatTypes';
import { handleFriendRequest } from '../../../../utilities/handleFriendRequests';

type FriendCardProps = {
    friendData: MinimalUserTypes;
    setActiveChat: (chat: ChatConversationType) => void;
};

/**
 * FriendCard component to display information and actions for a friend.
 *
 * @component
 * @param {FriendCardProps} props - The props object.
 * @param {MinimalUserTypes} props.friendData - Data of the friend.
 * @param {Function} props.setActiveChat - Function to set the active chat.
 * @return {JSX.Element} The rendered FriendCard component.
 */
export default function FriendCard({
    friendData,
    setActiveChat,
}: FriendCardProps): JSX.Element {
    const { userpic, firstName, lastName, _id, accountType } = friendData;

    const { token } = useAuth();
    const { handleFetchUserData } = useCurrentUserData();
    const { handleFetchFriendData } = useFriendData();
    const { setInfo } = useInfoCard();
    const [shouldConfirmDialogShow, setShouldConfirmDialogShow] =
        useState(false);
    const isConfirmDialogMounted = shouldConfirmDialogShow;
    const showConfirmDialog = useDelayUnmount(isConfirmDialogMounted, 150);

    const [showMenu, setShowMenu] = useState(false);

    /**
     * Function to toggle the display of the friend card menu.
     *
     * @function
     * @return {void} No return value.
     */
    const toggleMenu = (): void => setShowMenu(!showMenu);

    /**
     * Function to handle the unfriend button click and show the confirmation dialog.
     *
     * @function
     * @return {void} No return value.
     */
    const handleUnfriendButtonClick = (): void => {
        setShouldConfirmDialogShow(true);
        setShowMenu(false);
    };

    /**
     * Confirmation dialog component.
     *
     * @type {JSX.Element}
     */
    const ConfirmDialog: JSX.Element = (
        <ConfirmationOverlay
            shouldConfirmDialogShow={shouldConfirmDialogShow}
            setShouldConfirmDialogShow={setShouldConfirmDialogShow}
            onConfirm={() => {
                if (token) {
                    const REQUEST_TYPE = 'unfriend';
                    handleFriendRequest(
                        token,
                        _id,
                        setInfo,
                        REQUEST_TYPE,
                        handleFetchUserData,
                        handleFetchFriendData
                    );
                }
            }}
            dialogInfo={{
                message: 'Do you really want to stop being friends?',
                icon: '✋',
            }}
        />
    );

    /**
     * Motion component for the open menu icon.
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
     * Motion component for the closed menu icon.
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
     * Content to display when the menu is open.
     *
     * @type {JSX.Element}
     */
    const MenuOpenContent: JSX.Element = (
        <FriendCardMenu
            id={_id}
            firstName={firstName}
            accountType={accountType}
            setActiveChat={setActiveChat}
            handleUnfriendButtonClick={handleUnfriendButtonClick}
        />
    );

    /**
     * Content to display when the menu is closed.
     *
     * @type {JSX.Element}
     */
    const MenuClosedContent: JSX.Element = (
        <FriendInfoCard
            userpic={userpic}
            firstName={firstName}
            lastName={lastName}
        />
    );

    /**
     * Rendered FriendCard component.
     *
     * @type {JSX.Element[]}
     */
    return (
        <>
            <div
                className={`relative w-48 md:w-40 h-60 flex flex-col justify-between text-center p-4 gap-4 bg-card dark:bg-cardDark text-cardDark shadow-lg rounded md:rounded-lg overflow-hidden ${
                    showMenu
                        ? 'bg-friendCardHighlight dark:bg-friendCardHighlightDark'
                        : ''
                } `}
            >
                <div className="group">
                    <button
                        onClick={toggleMenu}
                        className="cursor-pointer absolute top-0 right-0 h-12 w-12 rounded text-regularText dark:text-regularTextDark bg-friendCardHighlight dark:bg-friendCardHighlightDark rounded-es-full transform transition-all duration-300 hover:w-72 hover:h-72 group-hover:w-72 group-hover:h-72"
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
            {showConfirmDialog && ConfirmDialog}
        </>
    );
}
