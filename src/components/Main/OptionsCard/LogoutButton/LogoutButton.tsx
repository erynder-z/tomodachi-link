import React from 'react';
import { TbLogout } from 'react-icons/tb';
import useAuth from '../../../../hooks/useAuth';

export default function LogoutButton() {
    const { logout } = useAuth();
    return (
        <button
            type="button"
            onClick={logout}
            className="cursor-pointer hover:drop-shadow-md hover:text-red-500"
        >
            <TbLogout size="1.5em" />
        </button>
    );
}
