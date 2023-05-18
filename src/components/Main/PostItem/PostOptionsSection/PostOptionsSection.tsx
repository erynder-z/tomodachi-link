import React from 'react';
import { MdMoreVert, MdEdit, MdOutlineDeleteForever } from 'react-icons/md';

type PostOptionsSectionProps = {
    handleShowPostMenu: () => void;
    isMenuOpen: boolean;
};

export default function PostOptionsSection({
    handleShowPostMenu,
    isMenuOpen,
}: PostOptionsSectionProps) {
    return (
        <div className="relative inline-block">
            <button onClick={handleShowPostMenu}>
                <MdMoreVert size="1.25em" />
            </button>
            {isMenuOpen && (
                <div className="absolute top-8 right-0 z-10 bg-popupMenu border shadow-lg">
                    <ul className="flex flex-col gap-4 ">
                        <li>
                            <button className="flex justify-around items-center gap-2 w-full p-4 hover:bg-red-300">
                                <MdEdit size="1.25em" />
                            </button>
                        </li>
                        <li>
                            <button className="flex justify-center items-center gap-2 w-full p-4 hover:bg-red-300">
                                <MdOutlineDeleteForever size="1.25em" />
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
