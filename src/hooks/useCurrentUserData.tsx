import { useContext } from 'react';
import CurrentUserDataContext from '../contexts/CurrentUserDataContext';

const useCurrentUserData = () => {
    return useContext(CurrentUserDataContext);
};

export default useCurrentUserData;
