import React from 'react';
import { MdEmojiPeople } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

export default function FriendSectionButton() {
    const handleFriendSectionButtonClick = () => {
        console.log('test');
    };
    return (
        <NavLink
            to="/friends"
            className="flex self-center cursor-pointer text-cBlack h-full w-full"
        >
            <button type="button" onClick={handleFriendSectionButtonClick}>
                <MdEmojiPeople size="1.5em" />
            </button>
        </NavLink>
    );
}
