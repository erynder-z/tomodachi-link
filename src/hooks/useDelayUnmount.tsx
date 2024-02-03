import { useEffect, useState } from 'react';

//TODO Handle desired effect completely via framer motion lib.

/**
 * Custom hook to delay unmounting of a component based on a given delay time.
 *
 * @param {boolean} isMounted - indicates whether the component is currently mounted
 * @param {number} delayTime - the delay time in milliseconds
 * @return {boolean} the status of the element to be shown or hidden
 */
function useDelayUnmount(isMounted: boolean, delayTime: number): boolean {
    const [showElement, setShowElement] = useState<boolean>(false);
    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;
        if (isMounted && !showElement) {
            setShowElement(true);
        } else if (!isMounted && showElement) {
            timeoutId = setTimeout(() => setShowElement(false), delayTime);
        }
        return () => clearTimeout(timeoutId);
    }, [isMounted, delayTime, showElement]);
    return showElement;
}

export default useDelayUnmount;
