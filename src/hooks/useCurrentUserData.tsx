import { useContext } from 'react';
import CurrentUserDataContext from '../contexts/CurrentUserDataContext';

/**
 * Retrieves the current user data from the context.
 *
 * @return {CurrentUserDataContext} The current user data from the context
 */
const useCurrentUserData = () => {
    return useContext(CurrentUserDataContext);
};

export default useCurrentUserData;
