import React from 'react';
import { MdOutlineLogout } from 'react-icons/md';
import useAuth from '../../../../../hooks/useAuth';

export default function MenuLogoutButton() {
    const { logout } = useAuth();
    return (
        <button
            type="button"
            onClick={logout}
            className="cursor-pointer hover:drop-shadow-md hover:text-red-500"
        >
            <MdOutlineLogout size="1.5em" />
        </button>
    );
}
