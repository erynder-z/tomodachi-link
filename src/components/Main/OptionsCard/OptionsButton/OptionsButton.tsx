import React, { useState } from 'react';
import { MdSettings } from 'react-icons/md';
import EditUserDataModal from '../../EditUserDataModal/EditUserDataModal';

type Props = {
    setShowOptions?: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function OptionsButton({ setShowOptions }: Props) {
    const [showOverlay, setShowOverlay] = useState(false);

    const handleButtonClick = () => {
        setShowOverlay(!showOverlay);
    };

    return (
        <>
            <button
                type="button"
                onClick={handleButtonClick}
                className="cursor-pointer hover:drop-shadow-md hover:text-blue-400"
            >
                <MdSettings size="1.5em" />
            </button>
            {showOverlay && (
                <EditUserDataModal
                    setShowOverlay={setShowOverlay}
                    setShowOptions={setShowOptions}
                />
            )}
        </>
    );
}
