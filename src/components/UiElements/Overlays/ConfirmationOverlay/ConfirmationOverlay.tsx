import useEscapeKey from '../../../../hooks/useEscapeKeyToHandleAction';
import { InfoType } from '../../../../types/infoTypes';
import { motion, AnimatePresence } from 'framer-motion';

type ConfirmationOverlayProps = {
    shouldConfirmDialogShow: boolean;
    setShouldConfirmDialogShow: React.Dispatch<React.SetStateAction<boolean>>;
    onConfirm: () => void;
    dialogInfo?: InfoType | null;
};

/**
 * React component for rendering a confirmation overlay with Yes/No buttons.
 *
 * @function
 * @param {ConfirmationOverlayProps} props - The component props.
 * @param {boolean} props.shouldConfirmDialogShow - Indicates whether the confirmation dialog should be displayed.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setShouldConfirmDialogShow - React state dispatch function to control the visibility of the confirmation dialog.
 * @param {Function} props.onConfirm - Callback function to execute when the user confirms the action.
 * @param {InfoType | null} [props.dialogInfo] - Information about the confirmation dialog (message and icon).
 * @returns {JSX.Element} The rendered ConfirmationOverlay component.
 */
const ConfirmationOverlay = ({
    shouldConfirmDialogShow,
    setShouldConfirmDialogShow,
    onConfirm,
    dialogInfo = null,
}: ConfirmationOverlayProps): JSX.Element => {
    /**
     * Handles the click event when the "Yes" button is clicked.
     *
     * @function
     * @returns {void}
     */
    const handleYesButtonClick = (): void => {
        onConfirm();
        setShouldConfirmDialogShow(false);
    };

    /**
     * Handles the click event when the "No" button is clicked.
     *
     * @function
     * @returns {void}
     */
    const handleNoButtonClick = (): void => setShouldConfirmDialogShow(false);

    /**
     * Custom hook to close the overlay when pressing ESC
     *
     */
    useEscapeKey(handleNoButtonClick);

    /**
     * JSX element representing the content of the confirmation dialog.
     *
     * @type {JSX.Element}
     */
    const Dialog: JSX.Element = (
        <div className="flex flex-col items-center gap-4 text-white text-2xl font-semibold">
            <span className="text-5xl">
                {dialogInfo?.icon && dialogInfo?.icon}
            </span>
            <h1>{dialogInfo?.message}</h1>
        </div>
    );

    /**
     * JSX element representing the "Yes" button.
     *
     * @type {JSX.Element}
     */
    const YesButton: JSX.Element = (
        <button
            className=" w-16 bg-green-500 text-white px-2 py-1 hover:bg-green-600 rounded"
            onClick={handleYesButtonClick}
        >
            Yes
        </button>
    );

    /**
     * JSX element representing the "No" button.
     *
     * @type {JSX.Element}
     */
    const NoButton: JSX.Element = (
        <button
            className="w-16 bg-red-500 text-white px-2 py-1 hover:bg-red-600 rounded"
            onClick={handleNoButtonClick}
        >
            No
        </button>
    );

    /**
     * Rendered JSX for the ConfirmationOverlay component.
     *
     * @type {JSX.Element}
     */
    return (
        <AnimatePresence>
            {shouldConfirmDialogShow && (
                <motion.div
                    key="ConfirmationOverlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden flex flex-col items-center justify-center gap-4 transition-opacity bg-slate-900/90"
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
