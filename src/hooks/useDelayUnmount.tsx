import { useEffect, useState } from 'react';

function useDelayUnmount(isMounted: boolean, delayTime: number) {
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
