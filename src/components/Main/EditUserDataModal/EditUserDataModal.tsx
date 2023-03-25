import React from 'react';
import { FaTimes } from 'react-icons/fa';
import EditUserDataModalForm from './EditUserDataModalForm/EditUserDataModalForm';

type Props = {
    showOverlay?: boolean;
    setShowOverlay: React.Dispatch<React.SetStateAction<boolean>>;
    setShowOptions?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditUserDataModal({
    showOverlay = false,
    setShowOverlay,
    setShowOptions,
}: Props) {
    const handleCloseButtonClick = () => {
        setShowOverlay(false);
        if (setShowOptions) {
            setShowOptions(false);
        }
    };
    return (
        <div
            className={`fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden flex flex-col items-center justify-center transition-all ${
                showOverlay
                    ? 'bg-black/80'
                    : 'opacity-0 pointer-events-none backdrop-filter-none'
            }`}
        >
            <div className="relative w-11/12 lg:w-1/4 flex justify-around rounded-md shadow-lg p-4 bg-white">
                <button
                    onClick={handleCloseButtonClick}
                    className="absolute top-2 right-2"
                >
                    <FaTimes />
                </button>
                <EditUserDataModalForm
                    setShowOverlay={setShowOverlay}
                    setShowOptions={setShowOptions}
                />
            </div>
        </div>
    );
}
