import React from 'react';
import { MdSettings } from 'react-icons/md';

export default function MenuOptionsButton() {
    return (
        <button
            type="button"
            className="cursor-pointer hover:drop-shadow-md hover:text-blue-400"
        >
            <MdSettings size="1.5em" />
        </button>
    );
}
