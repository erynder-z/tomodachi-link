import React, { useContext } from 'react';
import { GrLogout } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../../contexts/AuthContext';

export default function LogoutButton() {
    const { setToken, setUser } = useContext(AuthContext);

    const navigate = useNavigate();
    const handleLogout = () => {
        window.localStorage.clear();
        setToken(null);
        setUser(null);
        navigate('/');
    };

    return (
        <button
            type="button"
            onClick={handleLogout}
            className="ml-auto cursor-pointer"
        >
            <GrLogout size="1.5em" />
        </button>
    );
}
