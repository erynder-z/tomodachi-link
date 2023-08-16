import React from 'react';
import { FaTimes } from 'react-icons/fa';

type GuestAccountOverlayProps = {
    shouldGuestAccountOverlayShow: boolean;
    setShouldOverlaysShow: React.Dispatch<
        React.SetStateAction<{
            searchOverlay: boolean;
            editUserDataModal: boolean;
            mobileOptionsModal: boolean;
            guestAccountOverlay: boolean;
        }>
    >;
};

export default function GuestAccountOverlay({
    shouldGuestAccountOverlayShow,
    setShouldOverlaysShow,
}: GuestAccountOverlayProps) {
    const handleCloseButtonClick = () => {
        setShouldOverlaysShow({
            searchOverlay: false,
            editUserDataModal: false,
            mobileOptionsModal: false,
            guestAccountOverlay: false,
        });
    };

    return (
        <div
            className={`${
                shouldGuestAccountOverlayShow
                    ? 'animate-inAnimation'
                    : 'animate-outAnimation'
            } fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden  flex flex-col items-center justify-center gap-4 transition-opacity bg-gray-700/90`}
        >
            <button
                className="absolute top-0 right-0 m-4 text-white font-bold text-lg"
                onClick={handleCloseButtonClick}
            >
                <FaTimes />
            </button>
            SOMETHING
        </div>
    );
}
