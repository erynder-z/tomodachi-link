import { TbLogout } from 'react-icons/tb';
import useAuth from '../../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import useInfoCard from '../../../../hooks/useInfoCard';
import { motion } from 'framer-motion';

export default function LogoutButton() {
    const { logout } = useAuth();
    const { setInfo } = useInfoCard();
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        navigate('/');
        setInfo({
            typeOfInfo: 'good',
            message: 'Logged out!',
            icon: '😺',
        });
        logout();
    };

    return (
        <motion.button
            type="button"
            onClick={handleLogoutClick}
            whileTap={{ scale: 0.97 }}
            className="cursor-pointer hover:drop-shadow-md hover:text-red-500 duration-300"
        >
            <TbLogout size="1.5em" />
        </motion.button>
    );
}
