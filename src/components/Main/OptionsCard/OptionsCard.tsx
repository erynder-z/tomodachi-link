import React from 'react';
import LogoutButton from '../OptionButtons/LogoutButton/LogoutButton';
import OptionsButton from '../OptionButtons/OptionsButton/OptionsButton';
import ProfilePageButton from '../OptionButtons/ProfilePageButton/ProfilePageButton';

export default function OptionsCard() {
    return (
        <div className="w-full flex justify-around rounded-md shadow-lg p-4 bg-white">
            <ProfilePageButton />
            <OptionsButton />
            <LogoutButton />
        </div>
    );
}
