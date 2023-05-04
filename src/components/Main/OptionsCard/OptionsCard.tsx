import React from 'react';
import LogoutButton from './LogoutButton/LogoutButton';
import OptionsButton from './OptionsButton/OptionsButton';
import ProfilePageButton from './ProfilePageButton/ProfilePageButton';

type OptionsCardProps = {
    setShowOptions?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function OptionsCard({ setShowOptions }: OptionsCardProps) {
    return (
        <div className="flex flex-col gap-4 p-4 lg:w-full lg:flex-row lg:justify-around lg:shadow-lg  bg-card">
            <ProfilePageButton setShowOptions={setShowOptions} />
            <OptionsButton setShowOptions={setShowOptions} />
            <LogoutButton />
        </div>
    );
}
