import React from 'react';

export default function MyCoverSection() {
    return (
        <div className="h-96 col-span-5 grid grid-rows-4">
            <div className="row-span-3 flex h-full p-4 gap-4 bg-blue-300"></div>
            <div className="relative row-span-1 flex gap-4 px-4 bg-slate-300">
                <div className="flex flex-col justify-center w-full">
                    <h1 className="text-center font-bold h-auto">My Page</h1>
                </div>
            </div>
        </div>
    );
}
