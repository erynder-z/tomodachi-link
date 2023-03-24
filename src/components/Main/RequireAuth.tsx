import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RequireAuth = () => {
    const { isAuth } = useAuth();

    return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default RequireAuth;
