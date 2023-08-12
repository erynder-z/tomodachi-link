import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

export default function ButtonBusy() {
    return (
        <div className="flex justify-center items-center">
            <RotatingLines
                strokeColor="white"
                strokeWidth="4"
                animationDuration="0.75"
                width="28"
                visible={true}
            />
        </div>
    );
}
