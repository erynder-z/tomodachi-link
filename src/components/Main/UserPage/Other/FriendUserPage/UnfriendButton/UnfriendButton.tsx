import React, { useState } from 'react';
import { TbUserMinus } from 'react-icons/tb';
import useAuth from '../../../../../../hooks/useAuth';
import useCurrentUserData from '../../../../../../hooks/useCurrentUserData';
import useInfoCard from '../../../../../../hooks/useInfoCard';
import { unfriendUser } from '../../../../../../utilities/unfriendUser';
import useFriendData from '../../../../../../hooks/useFriendData';
import ConfirmationOverlay from '../../../../../ConfirmationOverlay/ConfirmationOverlay';
import { TbQuestionCircle } from 'react-icons/tb';

type UnfriendButtonProps = {
    unfriendUserId: string;
};

export default function UnfriendButton({
    unfriendUserId,
}: UnfriendButtonProps) {
    const { token } = useAuth();
    const { currentUserData, handleFetchUserData } = useCurrentUserData();
    const { handleFetchFriendData } = useFriendData();
    const { setInfo } = useInfoCard();
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const handleUnfriendButtonClick = () => {
        setShowConfirmDialog(true);
    };

    return (
        <>
            {showConfirmDialog && (
                <ConfirmationOverlay
                    setShowConfirmDialog={setShowConfirmDialog}
                    onConfirm={() => {
                        if (token && currentUserData) {
                            unfriendUser(
                                token,
                                currentUserData?._id,
                                unfriendUserId,
                                handleFetchUserData,
                                handleFetchFriendData,
                                setInfo
                            );
                        }
                    }}
                    dialogInfo={{
                        message: 'Do you really want to stop being friends?',
                        icon: <TbQuestionCircle size="2em" />,
                    }}
                />
            )}
            <button
                className="flex justify-center items-center gap-4 bg-red-500 text-white rounded-md px-2 py-1 ml-auto hover:bg-red-600"
                onClick={handleUnfriendButtonClick}
            >
                Unfriend <TbUserMinus />
            </button>
        </>
    );
}
