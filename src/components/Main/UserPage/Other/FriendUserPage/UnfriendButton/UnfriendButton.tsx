import { useState } from 'react';
import { TbUserMinus } from 'react-icons/tb';
import useAuth from '../../../../../../hooks/useAuth';
import useCurrentUserData from '../../../../../../hooks/useCurrentUserData';
import useInfoCard from '../../../../../../hooks/useInfoCard';
import useFriendData from '../../../../../../hooks/useFriendData';
import ConfirmationOverlay from '../../../../../UiElements/Overlays/ConfirmationOverlay/ConfirmationOverlay';
import useDelayUnmount from '../../../../../../hooks/useDelayUnmount';
import { handleFriendRequest } from '../../../../../../utilities/handleFriendRequests';
import { motion } from 'framer-motion';

type UnfriendButtonProps = {
    unfriendUserId: string;
};

/**
 * React component for an Unfriend button.
 *
 * @component
 * @param {UnfriendButtonProps} props - The component props.
 * @param {string} props.unfriendUserId - The user ID to unfriend.
 * @returns {JSX.Element} The rendered UnfriendButton component.
 */
export default function UnfriendButton({
    unfriendUserId,
}: UnfriendButtonProps): JSX.Element {
    const { token } = useAuth();
    const { handleFetchUserData } = useCurrentUserData();
    const { handleFetchFriendData } = useFriendData();
    const { setInfo } = useInfoCard();
    const [shouldConfirmDialogShow, setShouldConfirmDialogShow] =
        useState(false);
    const isConfirmDialogMounted = shouldConfirmDialogShow;
    const showConfirmDialog = useDelayUnmount(isConfirmDialogMounted, 150);

    /**
     * Event handler for the Unfriend button click.
     *
     * @function
     * @returns {void}
     */
    const handleUnfriendButtonClick = (): void => {
        setShouldConfirmDialogShow(true);
    };

    /**
     * JSX Element representing the Confirmation Overlay for unfriending.
     *
     * @type {JSX.Element}
     */
    const ConfirmationModal: JSX.Element = (
        <ConfirmationOverlay
            shouldConfirmDialogShow={shouldConfirmDialogShow}
            setShouldConfirmDialogShow={setShouldConfirmDialogShow}
            onConfirm={() => {
                if (token) {
                    const requestType = 'unfriend';
                    handleFriendRequest(
                        token,
                        unfriendUserId,
                        setInfo,
                        requestType,
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
     * JSX Element representing the Unfriend button.
     *
     * @type {JSX.Element}
     */
    const Button: JSX.Element = (
        <motion.button
            whileTap={{ scale: 0.97 }}
            className="flex justify-center items-center gap-2 bg-red-500 text-regularTextDark px-2 py-1 w-fit m-auto md:ml-auto hover:bg-red-600 rounded"
            onClick={handleUnfriendButtonClick}
        >
            Unfriend <TbUserMinus size="1.25em" />
        </motion.button>
    );

    /**
     * The rendered UnfriendButton component.
     *
     * @type {JSX.Element}
     */
    return (
        <>
            {showConfirmDialog && ConfirmationModal}
            {Button}
        </>
    );
}
