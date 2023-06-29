import React from 'react';
import { MdPersonAddAlt1 } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

export default function MobileFriendSuggestionsButton() {
    const handleHomeSectionButtonClick = () => {
        console.log('test');
    };
    return (
        <NavLink
            to="/users/list"
            className="flex self-center cursor-pointer text-cBlack h-full w-full"
        >
            <button type="button" onClick={handleHomeSectionButtonClick}>
                <MdPersonAddAlt1 size="1.5em" />
            </button>
        </NavLink>
    );
}
