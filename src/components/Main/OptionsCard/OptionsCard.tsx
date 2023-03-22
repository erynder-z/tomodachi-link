import React from 'react';
import LogoutButton from './LogoutButton/LogoutButton';
import OptionsButton from './OptionsButton/OptionsButton';
import ProfilePageButton from './ProfilePageButton/ProfilePageButton';

export default function OptionsCard() {
    return (
        <div className="w-full flex justify-around rounded-md shadow-lg p-4 bg-white">
            <ProfilePageButton />
            <OptionsButton />
            <LogoutButton />
        </div>
    );
}
