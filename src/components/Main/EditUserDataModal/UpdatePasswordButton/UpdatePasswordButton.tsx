import React from 'react';
import { MdKey } from 'react-icons/md';

type Props = {
    setCurrentMenu: React.Dispatch<React.SetStateAction<string>>;
};

export default function UpdatePasswordButton({ setCurrentMenu }: Props) {
    const handleUpdatePasswordButtonClick = () => {
        setCurrentMenu('changePassword');
    };
    return (
        <div className="flex w-full">
            <button
                onClick={handleUpdatePasswordButtonClick}
                className="flex justify-center items-center gap-4 w-full bg-orange-500 text-white rounded-md px-2 py-1"
            >
                <MdKey size="1.5em" /> Change Password
            </button>
        </div>
    );
}
