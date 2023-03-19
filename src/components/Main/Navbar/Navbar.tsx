import React from 'react';
import LogoutButton from './LogoutButton/LogoutButton';

export default function Navbar() {
    return (
        <div className="h-full w-full items-center flex p-4 bg-slate-400">
            <h1>Navbar</h1>
            <LogoutButton />
        </div>
    );
}
