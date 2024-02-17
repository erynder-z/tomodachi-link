import { useEffect } from 'react';

/**
 * Hook for handling the 'Escape' key event.
 *
 * @param {() => void} callback - The callback function to execute when the 'Escape' key is pressed.
 */
const useEscapeKey = (callback: () => void): void => {
    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                callback();
            }
        };

        document.addEventListener('keydown', handleEscapeKey);

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [callback]);
};

export default useEscapeKey;
