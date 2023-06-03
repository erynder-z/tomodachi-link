import React, { useState } from 'react';
import { TbSettings } from 'react-icons/tb';
import EditUserDataModal from '../../EditUserDataModal/EditUserDataModal';
import useDelayUnmount from '../../../../hooks/useDelayUnmount';

type OptionsButtonProps = {
    setShowOptions?: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function OptionsButton({ setShowOptions }: OptionsButtonProps) {
    const [showOverlay, setShowOverlay] = useState(false);
    const isMounted = showOverlay;
    const showModal = useDelayUnmount(isMounted, 150);

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
                <TbSettings size="1.5em" />
            </button>
            {showModal && (
                <EditUserDataModal
                    showOverlay={showOverlay}
                    setShowOverlay={setShowOverlay}
                    setShowOptions={setShowOptions}
                />
            )}
        </>
    );
}
