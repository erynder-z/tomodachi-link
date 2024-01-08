import { TbEye, TbEyeExclamation } from 'react-icons/tb';
import useTheme from '../../../../hooks/useTheme';
import { ScanLinesType } from '../../../../types/miscTypes';
import { AnimatePresence, motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';

export default function ScanLinesToggle() {
    const { scanLines, setScanLines } = useTheme();

    const toggleScanLines = () => {
        const newScanLineType: ScanLinesType =
            scanLines === 'none' ? 'horizontal' : 'none';
        setScanLines(newScanLineType);
        localStorage.setItem('scanLinesOdinBook', newScanLineType);
    };

    return (
        <AnimatePresence initial={false}>
            <motion.div
                data-tooltip-id="options-scanlines-tooltip"
                data-tooltip-content="Toggle scanlines"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
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
