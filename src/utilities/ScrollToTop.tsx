import React, { useEffect } from 'react';
import { useLocation } from 'react-router';

// Scroll to the "container-main"-anchor when the URL changes to reset the current scroll position when Linking inside the Router
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const el = document.getElementById('container-main');
        el?.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
