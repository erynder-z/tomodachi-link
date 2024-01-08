import { TbLogout } from 'react-icons/tb';
import useAuth from '../../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import useInfoCard from '../../../../hooks/useInfoCard';
import { motion } from 'framer-motion';
import { InfoType } from '../../../../types/infoTypes';
import { Tooltip } from 'react-tooltip';

export default function LogoutButton() {
    const { logout } = useAuth();
    const { setInfo } = useInfoCard();
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        navigate('/');
        const SUCCESS_INFO = {
            typeOfInfo: 'good',
            message: 'Logged out!',
            icon: '😺',
        };
        setInfo(SUCCESS_INFO as InfoType);
        logout();
    };

    return (
        <>
            <motion.button
                data-tooltip-id="options-logout-tooltip"
                data-tooltip-content="Logout"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
                type="button"
                onClick={handleLogoutClick}
                whileTap={{ scale: 0.97 }}
                className="cursor-pointer hover:drop-shadow-md hover:text-red-500 duration-300"
            >
                <TbLogout size="1.5em" />
            </motion.button>
            <Tooltip
                id="options-logout-tooltip"
                style={{ fontSize: '0.75rem', zIndex: 99 }}
            />
        </>
    );
}
