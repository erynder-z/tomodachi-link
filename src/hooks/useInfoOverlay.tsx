import { useContext } from 'react';
import InfoOverlayContext from '../contexts/InfoOverlayContext';

const useInfoOverlay = () => {
    return useContext(InfoOverlayContext);
};

export default useInfoOverlay;
