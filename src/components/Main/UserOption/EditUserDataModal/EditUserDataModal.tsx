import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import EditUserDataModalForm from './EditUserDataModalForm/EditUserDataModalForm';
import UpdatePasswordButton from './UpdatePasswordButton/UpdatePasswordButton';
import UpdatePasswordForm from './UpdatePasswordForm/UpdatePasswordForm';
import { motion } from 'framer-motion';

type EditUserDataModalProps = {
    shouldEditUserDataModalShow: boolean;
    setShouldOverlaysShow: React.Dispatch<
        React.SetStateAction<{
            searchOverlay: boolean;
            editUserDataModal: boolean;
            mobileOptionsModal: boolean;
            guestAccountOverlay: boolean;
        }>
    >;
    setShowOptions?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditUserDataModal({
    setShouldOverlaysShow,
    setShowOptions,
}: EditUserDataModalProps): JSX.Element {
    const [currentMenu, setCurrentMenu] = useState<string>('Profile');

    const handleCloseButtonClick = () => {
        setShouldOverlaysShow({
            searchOverlay: false,
            editUserDataModal: false,
            mobileOptionsModal: false,
            guestAccountOverlay: false,
        });
        setShowOptions?.(false);
    };

    const renderCurrentMenu = (): JSX.Element => {
        const changeProfileMenu = (
            <>
                <EditUserDataModalForm
                    setShouldOverlaysShow={setShouldOverlaysShow}
                    setShowOptions={setShowOptions}
                />
                <UpdatePasswordButton setCurrentMenu={setCurrentMenu} />
            </>
        );

        const changePasswordMenu = (
            <UpdatePasswordForm
                setShouldOverlaysShow={setShouldOverlaysShow}
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

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-black/80">
            <div className="relative w-11/12 lg:w-1/5 flex flex-col justify-around shadow-lg p-4 bg-card dark:bg-cardDark text-regularText dark:text-regularTextDark  rounded lg:rounded-lg">
                <motion.button
                    onClick={handleCloseButtonClick}
                    whileTap={{ scale: 0.97 }}
                    id="non-mobile-close-button"
                    className="absolute -top-8 -right-8 bg-card dark:bg-cardDark hover:bg-red-500 text-red-500 hover:text-card rounded-full p-1 transition-colors duration-200"
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
