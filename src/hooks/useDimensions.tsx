import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';

type Dimensions = {
    width: number;
    height: number;
};

/**
 * Custom hook that provides the dimensions of a target DOM element and updates them when the window is resized.
 *
 * @param {React.RefObject<HTMLDivElement>} targetRef - reference to the target DOM element
 * @return {Dimensions} object containing the width and height of the target DOM element
 */
export const useDimensions = (
    targetRef: React.RefObject<HTMLDivElement>
): Dimensions => {
    const shouldInitialize = useRef(true);

    const getDimensions = useCallback(() => {
        return {
            width: targetRef.current ? targetRef.current.offsetWidth : 0,
            height: targetRef.current ? targetRef.current.offsetHeight : 0,
        };
    }, [targetRef]);

    const [dimensions, setDimensions] = useState(getDimensions);

    const handleResize = useCallback(() => {
        setDimensions(getDimensions());
    }, [getDimensions]);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    useLayoutEffect(() => {
        if (shouldInitialize.current) {
            handleResize();
            shouldInitialize.current = false;
        }
    }, [handleResize]);

    return dimensions;
};
