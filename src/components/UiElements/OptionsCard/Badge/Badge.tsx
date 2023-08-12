import React from 'react';

type BadgeProps = {
    numberToShow: number;
};

export default function Badge({ numberToShow }: BadgeProps) {
    return (
        <div className="absolute top-3 left-3 flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-white text-xs pointer-events-none">
            {numberToShow}
        </div>
    );
}
