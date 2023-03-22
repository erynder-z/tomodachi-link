import { useContext } from 'react';
import UserDataContext from '../contexts/UserDataContext';

const useUserData = () => {
    return useContext(UserDataContext);
};

export default useUserData;
