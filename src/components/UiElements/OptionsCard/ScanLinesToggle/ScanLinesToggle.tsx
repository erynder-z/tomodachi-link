import { TbEye, TbEyeExclamation } from 'react-icons/tb';
import useTheme from '../../../../hooks/useTheme';
import { ScanLinesType } from '../../../../types/miscTypes';
import { AnimatePresence, motion } from 'framer-motion';

export default function ScanLinesToggle() {
    const { scanLines, setScanLines } = useTheme();

    const toggleScanLines = () => {
        const newScanLineType: ScanLinesType =
            scanLines === 'none' ? 'matrix' : 'none';
        setScanLines(newScanLineType);
        localStorage.setItem('scanLinesOdinBook', newScanLineType);
    };

    return (
        <AnimatePresence initial={false}>
            <motion.div
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
        </AnimatePresence>
    );
}
