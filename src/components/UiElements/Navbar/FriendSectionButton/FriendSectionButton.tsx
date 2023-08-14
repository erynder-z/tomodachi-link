import React from 'react';
import { MdEmojiPeople } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

export default function FriendSectionButton() {
    return (
        <NavLink
            to="/friends"
            className="flex self-center cursor-pointer text-regularText dark:text-regularTextDark h-full w-full"
        >
            <button type="button">
                <MdEmojiPeople size="1.5em" />
            </button>
        </NavLink>
    );
}
