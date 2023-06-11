import React from 'react';
import { TbUserCircle } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import useCurrentUserData from '../../../../hooks/useCurrentUserData';
import Badge from '../Badge/Badge';

type ProfilePageButtonProps = {
    setShouldOverlaysShow: React.Dispatch<
        React.SetStateAction<{
            searchOverlay: boolean;
            editUserDataModal: boolean;
            mobileOptionsModal: boolean;
        }>
    >;
};

export default function ProfilePageButton({
    setShouldOverlaysShow,
}: ProfilePageButtonProps) {
    const { currentUserData } = useCurrentUserData();
    const { pendingFriendRequests } = currentUserData || {};
    const numberOfPendingFriendRequests = pendingFriendRequests?.length;

    const handleCloseOptions = () => {
        setShouldOverlaysShow({
            searchOverlay: false,
            editUserDataModal: false,
            mobileOptionsModal: false,
        });
    };

    return (
        <Link
            to={'/mypage'}
            onClick={handleCloseOptions}
            className="relative cursor-pointer hover:drop-shadow-md text-black hover:text-blue-400"
        >
            <TbUserCircle size="1.5em" />
            {numberOfPendingFriendRequests ? (
                <Badge numberToShow={numberOfPendingFriendRequests} />
            ) : null}
        </Link>
    );
}
