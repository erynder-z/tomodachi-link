import { InfoType } from '../../types/infoType';

type ConfirmationOverlayProps = {
    setShowConfirmDialog: React.Dispatch<React.SetStateAction<boolean>>;
    onConfirm: () => void;
    dialogInfo?: InfoType | null;
};

const ConfirmationOverlay = ({
    setShowConfirmDialog,
    onConfirm,
    dialogInfo = null,
}: ConfirmationOverlayProps) => {
    const handleYesButtonClick = () => {
        onConfirm();
        setShowConfirmDialog(false);
    };

    const handleNoButtonClick = () => {
        setShowConfirmDialog(false);
    };

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden  flex flex-col items-center justify-center gap-4 transition-opacity bg-gray-800/80">
            <h2 className="flex flex-col items-center gap-4 text-white text-xl font-semibold">
                {dialogInfo?.icon && dialogInfo?.icon}
                {dialogInfo?.message}
            </h2>
            <div className="flex gap-4 justify-center">
                <button
                    className=" w-16 bg-green-500 text-white rounded-md px-2 py-1 hover:bg-green-600"
                    onClick={handleYesButtonClick}
                >
                    Yes
                </button>
                <button
                    className="w-16 bg-red-500 text-white rounded-md px-2 py-1 hover:bg-red-600"
                    onClick={handleNoButtonClick}
                >
                    No
                </button>
            </div>
        </div>
    );
};

export default ConfirmationOverlay;
