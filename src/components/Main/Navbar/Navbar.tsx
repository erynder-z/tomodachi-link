import React from 'react';
import FriendSectionButton from './FriendSectionButton/FriendSectionButton';
import HomeSectionButton from './HomeSectionButton/HomeSectionButton';
import LogoutButton from './LogoutButton/LogoutButton';

export default function Navbar() {
    return (
        <div className="h-full w-full justify-between items-center flex px-4 py-1 bg-slate-400">
            <div className="flex justify-center items-center gap-4">
                <HomeSectionButton />
                <FriendSectionButton />
            </div>
            <LogoutButton />
        </div>
    );
}
