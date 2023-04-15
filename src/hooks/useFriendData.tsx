import { useContext } from 'react';
import FriendDataContext from '../contexts/FriendDataContext';

const useFriendData = () => {
    return useContext(FriendDataContext);
};

export default useFriendData;
