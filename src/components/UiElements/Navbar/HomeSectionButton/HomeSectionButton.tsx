import React from 'react';
import { MdHomeFilled } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

export default function HomeSectionButton() {
    return (
        <NavLink
            to="/home"
            className="flex self-center cursor-pointer text-regularText dark:text-regularTextDark h-full w-full"
        >
            <button type="button">
                <MdHomeFilled size="1.5em" />
            </button>
        </NavLink>
    );
}
