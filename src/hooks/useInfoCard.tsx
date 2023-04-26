import { useContext } from 'react';
import InfoCardContext from '../contexts/InfoCardContext';

const useInfoCard = () => {
    return useContext(InfoCardContext);
};

export default useInfoCard;
