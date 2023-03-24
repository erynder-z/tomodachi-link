import React from 'react';

import LogoutButton from '../../OptionButtons/LogoutButton/LogoutButton';
import OptionsButton from '../../OptionButtons/OptionsButton/OptionsButton';
import ProfilePageButton from '../../OptionButtons/ProfilePageButton/ProfilePageButton';

export default function NavbarUserOptionsMenu() {
    return (
        <div className="flex flex-col gap-4 p-4">
            <ProfilePageButton />
            <OptionsButton />
            <LogoutButton />
        </div>
    );
}
