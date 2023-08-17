import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { COVER_OPTIONS } from '../../../SharedComponents/CoverOptions';
import { CoverOption } from '../../../../../../types/coverOptionTypes';

type ChangeCoverMenuProps = {
    handleCloseButtonCLick: () => void;
    handleCoverOptionClick: (coverImage: CoverOption) => void;
    shouldMenuShow: boolean;
};

export default function ChangeCoverMenu({
    handleCloseButtonCLick,
    handleCoverOptionClick,
    shouldMenuShow,
}: ChangeCoverMenuProps) {
    return (
        <div
            className={`${
                shouldMenuShow
                    ? 'animate-popInAnimation'
                    : 'animate-popOutAnimation'
            } absolute right-4 top-4 z-10 flex flex-col bg-background1/80 dark:bg-background1Dark/80 text-regularText  dark:text-regularTextDark border-2 border-regularText dark:border-regularTextDark text-xs rounded lg:rounded-lg`}
        >
            <div className="flex">
                <span className="flex justify-center items-center p-2">
                    Choose a cover:
                </span>
                <button
                    onClick={handleCloseButtonCLick}
                    className="ml-auto p-2 text-red-500 hover:text-red-700 cursor-pointer"
                >
                    <FaTimes />
                </button>
            </div>

            {COVER_OPTIONS.map((coverImage, index) => (
                <div
                    key={index}
                    className="flex items-center p-2  cursor-pointer hover:bg-red-300"
                    onClick={() => handleCoverOptionClick(coverImage)}
                >
                    <img
                        src={coverImage.image}
                        alt={`cover option ${index + 1}`}
                        className="w-20 h-12 mr-2 object-cover"
                    />
                    <span> {coverImage.name}</span>
                </div>
            ))}
        </div>
    );
}
