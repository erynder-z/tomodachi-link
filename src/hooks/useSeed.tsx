import { useContext } from 'react';
import SeedContext from '../contexts/SeedContext';

const useSeed = () => {
    return useContext(SeedContext);
};

export default useSeed;
