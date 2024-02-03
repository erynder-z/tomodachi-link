import { useContext } from 'react';
import InfoCardContext from '../contexts/InfoCardContext';
import { InfoCardContextProps } from '../types/infoTypes';

/**
 * A custom React hook that returns the context value for the InfoCard component.
 *
 * @return {InfoCardContextProps}  The info card context
 */
const useInfoCard = (): InfoCardContextProps => {
    return useContext(InfoCardContext);
};

export default useInfoCard;
