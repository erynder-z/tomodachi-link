import React from 'react';
import { TbLogout } from 'react-icons/tb';
import useAuth from '../../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        navigate('/');
        logout();
    };

    return (
        <button
            type="button"
            onClick={handleLogoutClick}
            className="cursor-pointer hover:drop-shadow-md hover:text-red-500"
        >
            <TbLogout size="1.5em" />
        </button>
    );
}
