import { useContext } from 'react';
import NotificationBubblesContext from '../contexts/NotificationBubblesContext';
import { NotificationBubblesContextProps } from '../types/infoTypes';

/**
 * Returns the NotificationBubblesContext from the useContext hook.
 *
 * @return {NotificationBubblesContextProps} The NotificationBubblesContext object
 */
const useNotificationBubblesContext = (): NotificationBubblesContextProps => {
    return useContext(NotificationBubblesContext);
};

export default useNotificationBubblesContext;
