import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { AuthContextProps } from '../types/authTypes';

/**
 * A custom hook that returns the authentication context.
 *
 * @return {AuthContextProps} The authentication context
 */
const useAuth = (): AuthContextProps => {
    return useContext(AuthContext);
};

export default useAuth;
