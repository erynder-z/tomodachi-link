import React from 'react';
import { MdEmojiPeople } from 'react-icons/md';
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
                <MdEmojiPeople size="1.5em" />
            </button>
        </NavLink>
    );
}
