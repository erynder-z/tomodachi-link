import React from 'react';

type RegisterButtonProps = {
    handleRegisterClick: () => void;
};

export default function RegisterButton({
    handleRegisterClick,
}: RegisterButtonProps) {
    return (
        <button
            onClick={handleRegisterClick}
            className="w-full relative overflow-hidden bg-green-500 text-white text-xl font-bold py-2 px-4 rounded transition duration-300 ease-in-out group"
        >
            <span className="z-10 relative">Create account</span>
            <span className="absolute top-0 left-0 h-full w-full bg-green-600 transform -translate-x-full transition duration-300 ease-in-out group-hover:translate-x-0"></span>
        </button>
    );
}
