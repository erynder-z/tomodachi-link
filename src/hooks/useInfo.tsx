import { useContext } from 'react';
import InfoOverlayContext from '../contexts/InfoOverlayContext';

const useInfo = () => {
    return useContext(InfoOverlayContext);
};

export default useInfo;
