import { InfoType } from '../../../../types/infoTypes';
import { motion, AnimatePresence } from 'framer-motion';

type ConfirmationOverlayProps = {
    shouldConfirmDialogShow: boolean;
    setShouldConfirmDialogShow: React.Dispatch<React.SetStateAction<boolean>>;
    onConfirm: () => void;
    dialogInfo?: InfoType | null;
};

const ConfirmationOverlay = ({
    shouldConfirmDialogShow,
    setShouldConfirmDialogShow,
    onConfirm,
    dialogInfo = null,
}: ConfirmationOverlayProps) => {
    const handleYesButtonClick = () => {
        onConfirm();
        setShouldConfirmDialogShow(false);
    };

    const handleNoButtonClick = () => setShouldConfirmDialogShow(false);
    const Dialog = (
        <div className="flex flex-col items-center gap-4 text-white text-2xl font-semibold">
            <span className="text-5xl">
                {dialogInfo?.icon && dialogInfo?.icon}
            </span>
            <h1>{dialogInfo?.message}</h1>
        </div>
    );

    const YesButton = (
        <button
            className=" w-16 bg-green-500 text-white px-2 py-1 hover:bg-green-600"
            onClick={handleYesButtonClick}
        >
            Yes
        </button>
    );

    const NoButton = (
        <button
            className="w-16 bg-red-500 text-white px-2 py-1 hover:bg-red-600"
            onClick={handleNoButtonClick}
        >
            No
        </button>
    );

    return (
        <AnimatePresence>
            {shouldConfirmDialogShow && (
                <motion.div
                    key="ConfirmationOverlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden  flex flex-col items-center justify-center gap-4 transition-opacity bg-gray-700/90"
                >
                    {Dialog}
                    <div className="flex gap-4 justify-center">
                        {YesButton}
                        {NoButton}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmationOverlay;
