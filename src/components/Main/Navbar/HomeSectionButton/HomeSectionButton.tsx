import React from 'react';
import { MdHomeFilled } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

export default function HomeSectionButton() {
    const handleHomeSectionButtonClick = () => {
        console.log('test');
    };
    return (
        <NavLink
            to="/home"
            className="flex self-center cursor-pointer text-cBlack h-full w-full"
        >
            <button type="button" onClick={handleHomeSectionButtonClick}>
                <MdHomeFilled size="1.5em" />
            </button>
        </NavLink>
    );
}
