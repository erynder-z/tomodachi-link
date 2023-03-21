import React from 'react';
import { MdLogout } from 'react-icons/md';
import { HandleLogoutProps } from '../../../../types/handleLogoutTypes';

export default function LogoutButton({ handleLogout }: HandleLogoutProps) {
    return (
        <button
            type="button"
            onClick={handleLogout}
            className="flex self-center cursor-pointer"
        >
            <MdLogout size="1.5em" />
        </button>
    );
}
