import React from 'react';
import MenuLogoutButton from './MenuLogoutButton/MenuLogoutButton';
import MenuOptionsButton from './MenuOptionsButton/MenuOptionsButton';
import MenuProfilePageButton from './MenuProfilePageButton/MenuProfilePageButton';

export default function NavbarUserOptionsMenu() {
    return (
        <div className="flex flex-col gap-4 p-4">
            <MenuProfilePageButton />
            <MenuOptionsButton />
            <MenuLogoutButton />
        </div>
    );
}
