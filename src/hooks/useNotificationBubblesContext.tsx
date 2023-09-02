import { useContext } from 'react';
import NotificationBubblesContext from '../contexts/NotificationBubblesContext';

const useNotificationBubblesContext = () => {
    return useContext(NotificationBubblesContext);
};

export default useNotificationBubblesContext;
