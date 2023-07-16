import React, { useState, useEffect } from 'react';
import { MdKeyboardDoubleArrowUp } from 'react-icons/md';

export function ScrollToTopButton() {
    const [showButton, setShowButton] = useState(false);

    const handleClick = () => {
        const el = document.getElementById('container-main');
        el?.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const handleScroll = () => {
        const el = document.getElementById('container-main');
        if (el) {
            const { scrollTop, clientHeight } = el;
            setShowButton(scrollTop > clientHeight);
        }
    };

    useEffect(() => {
        const el = document.getElementById('container-main');
        if (el) {
            el.addEventListener('scroll', handleScroll);
            return () => {
                el.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

    return (
        <button
            className={`fixed bottom-14 right-2 lg:bottom-4 lg:right-4 p-2 z-50 rounded-full bg-gray-800/50 text-white transition-transform duration-300 ${
                showButton ? 'scale-100' : 'scale-0'
            }`}
            onClick={handleClick}
            style={{ scrollBehavior: 'smooth' }}
        >
            <MdKeyboardDoubleArrowUp size="2em" />
        </button>
    );
}
