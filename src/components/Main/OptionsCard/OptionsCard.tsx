import React from 'react';
import LogoutButton from './LogoutButton/LogoutButton';
import OptionsButton from './OptionsButton/OptionsButton';
import ProfilePageButton from './ProfilePageButton/ProfilePageButton';

type Props = {
    setShowOptions?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function OptionsCard({ setShowOptions }: Props) {
    return (
        <div className="flex flex-col gap-4 p-4 lg:w-full lg:flex-row lg:justify-around lg:rounded-md lg:shadow-lg  bg-card">
            <ProfilePageButton />
            <OptionsButton setShowOptions={setShowOptions} />
            <LogoutButton />
        </div>
    );
}
