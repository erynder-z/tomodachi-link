import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import EditUserDataModalForm from './EditUserDataModalForm/EditUserDataModalForm';
import UpdatePasswordButton from './UpdatePasswordButton/UpdatePasswordButton';
import UpdatePasswordForm from './UpdatePasswordForm/UpdatePasswordForm';
import { motion } from 'framer-motion';
import useEscapeKey from '../../../../hooks/useEscapeKeyToHandleAction';

type EditUserDataModalProps = {
    shouldEditUserDataModalShow: boolean;
    resetOverlays: () => void;
    setShowOptions?: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * React component for the modal to edit user data.
 *
 * @component
 * @param {EditUserDataModalProps} props - The component props.
 * @returns {JSX.Element} The rendered EditUserDataModal component.
 */
export default function EditUserDataModal({
    resetOverlays,
    setShowOptions,
}: EditUserDataModalProps): JSX.Element {
    const [currentMenu, setCurrentMenu] = useState<string>('Profile');

    /**
     * Handles the close button click, hiding the modal.
     *
     * @function
     * @returns {void}
     */
    const handleCloseButtonClick = (): void => {
        resetOverlays();
        setShowOptions?.(false);
    };

    /**
     * Custom hook to close the overlay when pressing ESC
     *
     */
    useEscapeKey(handleCloseButtonClick);

    /**
     * Renders the current menu based on the state. Shows form to edit the user data or form to change the password.
     *
     * @function
     * @returns {JSX.Element} The rendered current menu.
     */
    const renderCurrentMenu = (): JSX.Element => {
        const changeProfileMenu = (
            <>
                <EditUserDataModalForm
                    resetOverlays={resetOverlays}
                    setShowOptions={setShowOptions}
                />
                <UpdatePasswordButton setCurrentMenu={setCurrentMenu} />
            </>
        );

        const changePasswordMenu = (
            <UpdatePasswordForm
                resetOverlays={resetOverlays}
                setShowOptions={setShowOptions}
            />
        );

        switch (currentMenu) {
            case 'changePassword':
                return changePasswordMenu;
            default:
                return changeProfileMenu;
        }
    };

    /**
     * The rendered EditUserDataModal component.
     *
     * @type {JSX.Element}
     */
    return (
        <div
            onClick={handleCloseButtonClick}
            className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-slate-900/90"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-11/12 lg:w-1/5 flex flex-col justify-around shadow-lg p-4 bg-card dark:bg-cardDark text-regularText dark:text-regularTextDark  rounded lg:rounded-lg"
            >
                <motion.button
                    onClick={handleCloseButtonClick}
                    whileTap={{ scale: 0.97 }}
                    id="non-mobile-close-button"
                    className="hidden md:block absolute -top-8 -right-8 bg-card dark:bg-cardDark hover:bg-red-500 text-red-500 hover:text-card rounded-full p-1 transition-colors duration-200"
                >
                    <FaTimes size="1.25em" />
                </motion.button>
                <div className="md:hidden">
                    <motion.button
                        onClick={handleCloseButtonClick}
                        whileTap={{ scale: 0.97 }}
                        id="mobile-close-button"
                        className="absolute top-2 right-2"
                    >
                        <FaTimes />
                    </motion.button>
                </div>
                {renderCurrentMenu()}
            </div>
        </div>
    );
}
