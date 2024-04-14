import { TbEye, TbEyeExclamation } from 'react-icons/tb';
import useTheme from '../../../../hooks/useTheme';
import { ScanLinesType } from '../../../../types/miscTypes';
import { AnimatePresence, motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';

/**
 * React component for rendering a toggle button for scanlines.
 *
 * @component
 * @returns {JSX.Element} The rendered ScanLinesToggle component.
 */
export default function ScanLinesToggle(): JSX.Element {
    const { scanLines, setScanLines, isMobileDevice } = useTheme();

    /**
     * Toggles the scanlines between 'none' and 'horizontal', and updates local storage.
     *
     * @function
     * @returns {void}
     */
    const toggleScanLines = (): void => {
        const newScanLineType: ScanLinesType =
            scanLines === 'none' ? 'horizontal' : 'none';
        setScanLines(newScanLineType);
        localStorage.setItem('scanLinesTomodachiLink', newScanLineType);
    };

    /**
     * Rendered JSX for the ScanLinesToggle component.
     *
     * @type {JSX.Element}
     */
    return (
        <AnimatePresence initial={false}>
            <motion.div
                key="scanLinesToggle"
                data-tooltip-id="options-scanlines-tooltip"
                data-tooltip-content="Toggle scanlines"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
                data-tooltip-hidden={isMobileDevice}
                onClick={toggleScanLines}
                whileTap={{ scale: 0.97 }}
                className="cursor-pointer hover:text-highlight dark:hover:text-highlightDark duration-300"
            >
                {scanLines === 'none' ? (
                    <TbEye size="1.5em" />
                ) : (
                    <TbEyeExclamation size="1.5em" />
                )}
            </motion.div>
            <Tooltip
                id="options-scanlines-tooltip"
                style={{ fontSize: '0.75rem', zIndex: 99 }}
            />
        </AnimatePresence>
    );
}
