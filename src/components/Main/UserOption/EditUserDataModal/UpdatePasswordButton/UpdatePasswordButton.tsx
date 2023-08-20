import React from 'react';
import { MdKey } from 'react-icons/md';

type UpdatePasswordButtonProps = {
    setCurrentMenu: React.Dispatch<React.SetStateAction<string>>;
};

export default function UpdatePasswordButton({
    setCurrentMenu,
}: UpdatePasswordButtonProps) {
    const handleUpdatePasswordButtonClick = () => {
        setCurrentMenu('changePassword');
    };
    return (
        <div className="flex w-full">
            <button
                onClick={handleUpdatePasswordButtonClick}
                className="flex justify-center items-center gap-4 w-full bg-fuchsia-700 hover:bg-fuchsia-800 text-regularTextDark px-2 py-1 rounded"
            >
                <MdKey size="1.5em" /> Change Password
            </button>
        </div>
    );
}
