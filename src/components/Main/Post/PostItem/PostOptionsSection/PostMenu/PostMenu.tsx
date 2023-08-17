import React from 'react';
import { MdEdit, MdOutlineDeleteForever } from 'react-icons/md';

type PostMenuProps = {
    handleEditButtonClick: () => void;
    handleDeleteButtonClick: () => void;
    shouldMenuShow: boolean;
};

export default function PostMenu({
    handleEditButtonClick,
    handleDeleteButtonClick,
    shouldMenuShow,
}: PostMenuProps) {
    return (
        <div
            className={`${
                shouldMenuShow
                    ? 'animate-popInAnimation'
                    : 'animate-popOutAnimation'
            } absolute top-8 right-0 z-10 bg-card dark:bg-cardDark text-regularText dark:text-regularTextDark border shadow-lg`}
        >
            <ul className="flex flex-col gap-4 ">
                <li>
                    <button
                        onClick={handleEditButtonClick}
                        className="flex justify-around items-center gap-2 w-full p-4 hover:bg-red-300"
                    >
                        <MdEdit size="1.25em" />
                    </button>
                </li>
                <li>
                    <button
                        onClick={handleDeleteButtonClick}
                        className="flex justify-center items-center gap-2 w-full p-4 hover:bg-red-300"
                    >
                        <MdOutlineDeleteForever size="1.25em" />
                    </button>
                </li>
            </ul>
        </div>
    );
}
