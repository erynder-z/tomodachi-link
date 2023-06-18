import React, { useState } from 'react';
import { MinimalUserTypes } from '../../../../types/minimalUserTypes';
import { getCorrectUserpicFormat } from '../../../../utilities/getCorrectUserpicFormat';
import {
    TbLink,
    TbMessages,
    TbUserMinus,
    TbQuestionCircle,
} from 'react-icons/tb';
import { Link } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';
import useInfoCard from '../../../../hooks/useInfoCard';
import useDelayUnmount from '../../../../hooks/useDelayUnmount';
import ConfirmationOverlay from '../../../ConfirmationOverlay/ConfirmationOverlay';
import { unfriendUser } from '../../../../utilities/unfriendUser';
import useFriendData from '../../../../hooks/useFriendData';

type FriendCardProps = {
    friendData: MinimalUserTypes;
};

export default function FriendCard({ friendData }: FriendCardProps) {
    const { userpic, firstName, lastName, _id } = friendData;

    const { token } = useAuth();
    const { currentUserData, handleFetchUserData } = useCurrentUserData();
    const { handleFetchFriendData } = useFriendData();
    const { setInfo } = useInfoCard();
    const [shouldConfirmDialogShow, setShouldConfirmDialogShow] =
        useState(false);
    const isConfirmDialogMounted = shouldConfirmDialogShow;
    const showConfirmDialog = useDelayUnmount(isConfirmDialogMounted, 150);

    const handleUnfriendButtonClick = () => {
        setShouldConfirmDialogShow(true);
    };

    return (
        <>
            {showConfirmDialog && (
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
                        icon: <TbQuestionCircle size="2em" />,
                    }}
                />
            )}
            <div className="w-5/6 lg:w-44 mx-auto">
                <div className="w-full flex flex-col text-center p-4 bg-card shadow-lg">
                    {' '}
                    <section>
                        <img
                            className="w-20 h-20 object-cover mx-auto relative -top-12 border-4 border-cBlue"
                            src={`data:image/png;base64,${getCorrectUserpicFormat(
                                userpic
                            )}`}
                            alt="User avatar"
                        />
                        <p className="font-semibold text-md my-5 break-all relative -top-5">
                            {firstName} {lastName}
                        </p>
                    </section>
                    <div className="flex justify-around items-center">
                        <Link
                            to={`/users/${_id}`}
                            className="flex items-center w-max gap-4 py-2 text-regularText "
                        >
                            <TbLink className="text-xl hover:scale-125 hover:text-cRed transition-all" />
                        </Link>
                        <TbMessages className="text-xl cursor-pointer hover:scale-125 hover:text-cRed transition-all" />
                        <TbUserMinus
                            onClick={handleUnfriendButtonClick}
                            className="text-xl cursor-pointer hover:scale-125 hover:text-cRed transition-all"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
