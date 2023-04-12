import React from 'react';

type Props = {
    numberToShow: number;
};

export default function Badge({ numberToShow }: Props) {
    return (
        <div className="absolute top-3 left-3 flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-white text-xs pointer-events-none">
            {numberToShow}
        </div>
    );
}
