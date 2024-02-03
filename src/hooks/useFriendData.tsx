import { useContext } from 'react';
import FriendDataContext from '../contexts/FriendDataContext';
import { FriendDataContextProps } from '../types/friendTypes';

/**
 * Returns the friend data from the context.
 *
 * @return {FriendDataContextProps} The friend data from the context
 */
const useFriendData = (): FriendDataContextProps => {
    return useContext(FriendDataContext);
};

export default useFriendData;
