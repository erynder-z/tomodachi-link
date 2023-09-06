import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

type LoadingSpinnerProps = {
    message?: string;
};

export default function LoadingSpinner({ message }: LoadingSpinnerProps) {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-4 text-regularText dark:text-regularTextDark">
            {message && <h1 className="font-bold">{message}</h1>}
            <RotatingLines
                strokeColor="gray"
                strokeWidth="4"
                animationDuration="0.75"
                width="48"
                visible={true}
            />
        </div>
    );
}
