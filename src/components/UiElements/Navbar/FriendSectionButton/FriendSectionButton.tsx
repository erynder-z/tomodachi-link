import React from 'react';
import { MdOutlineDiversity3 } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

export default function FriendSectionButton() {
    return (
        <NavLink
            to="/friends"
            className={({ isActive }) =>
                isActive
                    ? 'text-highlight dark:text-highlightDark flex self-center cursor-pointer h-6 w-full'
                    : 'text-regularText dark:text-regularTextDark flex self-center cursor-pointer h-6 w-full'
            }
        >
            <button type="button">
                <MdOutlineDiversity3 size="1.5em" />
            </button>
        </NavLink>
    );
}
