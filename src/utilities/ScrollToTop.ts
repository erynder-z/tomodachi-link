import { useEffect } from 'react';
import { useLocation } from 'react-router';

/**
 * Scroll the main container to the top when the pathname changes.
 *
 * @return {null} The function does not return any value
 */
const ScrollToTop = (): null => {
    const { pathname } = useLocation();

    useEffect(() => {
        const el = document.getElementById('container-main');
        setTimeout(() => {
            el?.scrollTo(0, 0);
        }, 200);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
