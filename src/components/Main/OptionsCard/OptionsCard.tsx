import React from 'react';
import LogoutButton from './LogoutButton/LogoutButton';
import OptionsButton from './OptionsButton/OptionsButton';
import ProfilePageButton from './ProfilePageButton/ProfilePageButton';
import useUserData from '../../../hooks/useUserData';
import Badge from './Badge/Badge';

type Props = {
    setShowOptions?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function OptionsCard({ setShowOptions }: Props) {
    const { userData } = useUserData();
    const { pending_friend_requests } = userData || {};
    const numberOfPendingFriendRequests = pending_friend_requests?.length;
    return (
        <div className="relative flex flex-col gap-4 p-4 lg:w-full lg:flex-row lg:justify-around lg:rounded-md lg:shadow-lg  bg-card">
            <ProfilePageButton />
            {numberOfPendingFriendRequests ? (
                <Badge numberToShow={numberOfPendingFriendRequests} />
            ) : null}
            <OptionsButton setShowOptions={setShowOptions} />
            <LogoutButton />
        </div>
    );
}
