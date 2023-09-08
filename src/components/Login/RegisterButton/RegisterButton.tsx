import React from 'react';
import { MdPersonAddAlt1 } from 'react-icons/md';

type RegisterButtonProps = {
    handleRegisterClick: () => void;
};

export default function RegisterButton({
    handleRegisterClick,
}: RegisterButtonProps) {
    return (
        <button
            onClick={handleRegisterClick}
            className="relative overflow-hidden w-full bg-green-600 hover:bg-green-500 text-white text-xl font-bold rounded transition duration-500 ease-in-out"
        >
            <span className="z-10 relative w-full flex justify-center items-center group p-2 md:p-4 text-sm md:text-xl">
                <span className="transition-all duration-300 group-hover:pr-4">
                    Create account
                    <span className="opacity-0 absolute -right-0 group-hover:right-4 md:group-hover:right-8 transition-all duration-300 group-hover:opacity-100">
                        <MdPersonAddAlt1 size="1.5em" />
                    </span>
                </span>
            </span>
        </button>
    );
}
