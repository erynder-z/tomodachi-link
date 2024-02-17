import { useEffect } from 'react';
import { useLocation } from 'react-router';

/**
 * Custom hook to scroll the main container to the top when the pathname changes.
 */
const useScrollToTop = (): void => {
    const { pathname } = useLocation();

    useEffect(() => {
        const scrollToTop = () => {
            const el = document.getElementById('container-main');
            setTimeout(() => {
                el?.scrollTo(0, 0);
            }, 200);
        };

        scrollToTop();
    }, [pathname]);
};

export default useScrollToTop;
