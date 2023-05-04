import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import EditUserDataModalForm from './EditUserDataModalForm/EditUserDataModalForm';
import UpdatePasswordButton from './UpdatePasswordButton/UpdatePasswordButton';
import UpdatePasswordForm from './UpdatePasswordForm/UpdatePasswordForm';

type EditUserDataModalProps = {
    setShowOverlay: React.Dispatch<React.SetStateAction<boolean>>;
    setShowOptions?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditUserDataModal({
    setShowOverlay,
    setShowOptions,
}: EditUserDataModalProps): JSX.Element {
    const [currentMenu, setCurrentMenu] = useState<string>('Profile');

    const handleCloseButtonClick = () => {
        setShowOverlay(false);
        setShowOptions?.(false);
    };

    const renderCurrentMenu = (): JSX.Element => {
        const changeProfileMenu = (
            <>
                <EditUserDataModalForm
                    setShowOverlay={setShowOverlay}
                    setShowOptions={setShowOptions}
                />
                <UpdatePasswordButton setCurrentMenu={setCurrentMenu} />
            </>
        );

        const changePasswordMenu = (
            <UpdatePasswordForm
                setShowOverlay={setShowOverlay}
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
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden flex flex-col items-center justify-center bg-black/80 opacity">
            <div className="relative w-11/12 lg:w-1/4 flex flex-col justify-around shadow-lg p-4 bg-card">
                <button
                    onClick={handleCloseButtonClick}
                    className="absolute top-2 right-2"
                >
                    <FaTimes />
                </button>
                {renderCurrentMenu()}
            </div>
        </div>
    );
}
