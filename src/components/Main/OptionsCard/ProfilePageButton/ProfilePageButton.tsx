import React from 'react';
import { MdOutlineCoPresent } from 'react-icons/md';

export default function ProfilePageButton() {
    return (
        <button
            type="button"
            className="cursor-pointer hover:drop-shadow-md hover:text-blue-400"
        >
            <MdOutlineCoPresent size="1.5em" />
        </button>
    );
}
