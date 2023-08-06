import React from 'react';
import { TbSettings } from 'react-icons/tb';

type OptionsButtonProps = {
    shouldOverlaysShow: {
        searchOverlay: boolean;
        editUserDataModal: boolean;
        mobileOptionsModal: boolean;
        guestAccountOverlay: boolean;
    };
    setShouldOverlaysShow: React.Dispatch<
        React.SetStateAction<{
            searchOverlay: boolean;
            editUserDataModal: boolean;
            mobileOptionsModal: boolean;
            guestAccountOverlay: boolean;
        }>
    >;
};
export default function OptionsButton({
    shouldOverlaysShow,
    setShouldOverlaysShow,
}: OptionsButtonProps) {
    const handleButtonClick = () => {
        setShouldOverlaysShow({
            searchOverlay: false,
            editUserDataModal: !shouldOverlaysShow.editUserDataModal,
            mobileOptionsModal: false,
            guestAccountOverlay: false,
        });
    };

    return (
        <button
            type="button"
            onClick={handleButtonClick}
            className="cursor-pointer hover:drop-shadow-md hover:text-blue-400"
        >
            <TbSettings size="1.5em" />
        </button>
    );
}
