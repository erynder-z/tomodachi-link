import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

export default function LoadingSpinner() {
    return (
        <div className="w-full h-full flex justify-center items-center">
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
