import React from 'react';

type GuestLoginButtonProps = {
    handleGuestLogin: () => void;
};

export default function GuestLoginButton({
    handleGuestLogin,
}: GuestLoginButtonProps) {
    return (
        <button
            onClick={handleGuestLogin}
            className="w-full relative overflow-hidden bg-amber-500 text-white text-xl font-bold py-2 px-4 rounded transition duration-300 ease-in-out group"
        >
            <span className="z-10 relative">Login as guest</span>
            <span className="absolute top-0 left-0 h-full w-full bg-amber-600 transform -translate-x-full transition duration-300 ease-in-out group-hover:translate-x-0"></span>
        </button>
    );
}
