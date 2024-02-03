import { useState, useEffect } from 'react';
import { MdKeyboardDoubleArrowUp } from 'react-icons/md';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';

/**
 * React component for rendering a button that scrolls to the top of a specified container.
 *
 * @component
 * @returns {JSX.Element} The rendered ScrollToTopButton component.
 */
export function ScrollToTopButton(): JSX.Element {
    const [showButton, setShowButton] = useState(false);

    /**
     * Handles the click event to scroll to the top of the container.
     *
     * @function
     * @returns {void}
     */
    const handleClick = (): void => {
        const el = document.getElementById('container-main');
        el?.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    /**
     * Handles the scroll event to determine whether to show the scroll-to-top button.
     *
     * @function
     * @returns {void}
     */
    const handleScroll = (): void => {
        const el = document.getElementById('container-main');
        if (el) {
            const { scrollTop, clientHeight } = el;
            setShowButton(scrollTop > clientHeight);
        }
    };

    /**
     * useEffect hook to add and remove the scroll event listener.
     *
     * @effect
     * @returns {void}
     */
    useEffect(() => {
        const el = document.getElementById('container-main');
        if (el) {
            el.addEventListener('scroll', handleScroll);
            return () => {
                el.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

    /**
     * JSX Element representing the scroll-to-top button.
     *
     * @type {JSX.Element}
     */
    return (
        <>
            <button
                data-tooltip-id="scroll-top-tooltip"
                data-tooltip-content="Scroll to top"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
                className={`fixed bottom-14 right-2 lg:bottom-4 lg:right-4 p-2 z-50 rounded-full bg-gray-800/50 dark:bg-gray-300/50 text-regularTextDark transition-transform duration-300 ${
                    showButton ? 'scale-100' : 'scale-0'
                }`}
                onClick={handleClick}
                style={{ scrollBehavior: 'smooth' }}
            >
                <motion.div whileTap={{ scale: 0.5 }}>
                    <MdKeyboardDoubleArrowUp size="2em" />
                </motion.div>
            </button>
            <Tooltip id="scroll-top-tooltip" style={{ fontSize: '0.75rem' }} />
        </>
    );
}
