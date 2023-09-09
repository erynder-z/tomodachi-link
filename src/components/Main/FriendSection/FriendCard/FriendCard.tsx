import React, { useState } from 'react';
import { MinimalUserTypes } from '../../../../types/minimalUserTypes';
import useAuth from '../../../../hooks/useAuth';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';
import useInfoCard from '../../../../hooks/useInfoCard';
import useDelayUnmount from '../../../../hooks/useDelayUnmount';
import ConfirmationOverlay from '../../../UiElements/Overlays/ConfirmationOverlay/ConfirmationOverlay';
import { unfriendUser } from '../../../../utilities/unfriendUser';
import useFriendData from '../../../../hooks/useFriendData';
import FriendInfoCard from './FriendInfoCard/FriendInfoCard';
import FriendCardMenu from './FriendCardMenu/FriendCardMenu';
import { TbDotsDiagonal, TbFoldUp } from 'react-icons/tb';
import { motion } from 'framer-motion';
import { ChatConversationType } from '../../../../types/chatConversationType';

type FriendCardProps = {
    friendData: MinimalUserTypes;
    setActiveChat: (chat: ChatConversationType) => void;
};

export default function FriendCard({
    friendData,
    setActiveChat,
}: FriendCardProps) {
    const { userpic, firstName, lastName, _id } = friendData;

    const { token } = useAuth();
    const { currentUserData, handleFetchUserData } = useCurrentUserData();
    const { handleFetchFriendData } = useFriendData();
    const { setInfo } = useInfoCard();
    const [shouldConfirmDialogShow, setShouldConfirmDialogShow] =
        useState(false);
    const isConfirmDialogMounted = shouldConfirmDialogShow;
    const showConfirmDialog = useDelayUnmount(isConfirmDialogMounted, 150);

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleUnfriendButtonClick = () => {
        setShouldConfirmDialogShow(true);
        setShowMenu(false);
    };

    const ConfirmDialog = (
        <ConfirmationOverlay
            shouldConfirmDialogShow={shouldConfirmDialogShow}
            setShouldConfirmDialogShow={setShouldConfirmDialogShow}
            onConfirm={() => {
                if (token && currentUserData) {
                    unfriendUser(
                        token,
                        currentUserData?._id,
                        _id,
                        handleFetchUserData,
                        handleFetchFriendData,
                        setInfo
                    );
                }
            }}
            dialogInfo={{
                message: 'Do you really want to stop being friends?',
                icon: '✋',
            }}
        />
    );

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

    const MenuOpenContent = (
        <FriendCardMenu
            id={_id}
            firstName={firstName}
            setActiveChat={setActiveChat}
            handleUnfriendButtonClick={handleUnfriendButtonClick}
        />
    );

    const MenuClosedContent = (
        <FriendInfoCard
            userpic={userpic}
            firstName={firstName}
            lastName={lastName}
        />
    );

    return (
        <>
            {showConfirmDialog && ConfirmDialog}

            <div
                className={`relative w-48 md:w-40 h-60 flex flex-col justify-between text-center p-4 gap-4 bg-card dark:bg-cardDark shadow-lg rounded md:rounded-lg overflow-hidden ${
                    showMenu
                        ? 'bg-friendCardHighlight dark:bg-friendCardHighlight'
                        : ''
                } `}
            >
                <div className="group">
                    <button
                        onClick={toggleMenu}
                        className="cursor-pointer absolute top-0 right-0 h-12 w-12 rounded bg-friendCardHighlight dark:bg-friendCardHighlight rounded-es-full transform transition-all duration-300 hover:w-72 hover:h-72 group-hover:w-72 group-hover:h-72"
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
        </>
    );
}
