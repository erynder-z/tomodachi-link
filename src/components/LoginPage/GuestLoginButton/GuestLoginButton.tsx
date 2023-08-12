import React from 'react';
import ButtonBusy from '../../LoadingSpinner/ButtonBusy';

type GuestLoginButtonProps = {
    handleGuestLogin: () => void;
    isSubmitting: boolean;
};

export default function GuestLoginButton({
    handleGuestLogin,
    isSubmitting,
}: GuestLoginButtonProps) {
    return (
        <button
            disabled={isSubmitting}
            onClick={handleGuestLogin}
            className={`w-full relative overflow-hidden  text-white text-xl font-bold py-2 px-4 rounded transition duration-300 ease-in-out group ${
                isSubmitting ? 'bg-gray-500' : 'bg-amber-500'
            }`}
        >
            <span
                className={`absolute top-0 left-0 h-full w-full bg-amber-600 transform -translate-x-full transition duration-300 ease-in-out group-hover:translate-x-0 ${
                    isSubmitting ? 'bg-gray-600' : 'bg-amber-600'
                }`}
            ></span>
            {isSubmitting ? (
                <ButtonBusy />
            ) : (
                <span className="z-10 relative">Login as guest</span>
            )}
        </button>
    );
}
