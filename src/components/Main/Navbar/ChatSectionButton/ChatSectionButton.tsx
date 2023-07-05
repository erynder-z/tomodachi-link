import React from 'react';
import { MdOutlineChatBubbleOutline } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

export default function ChatSectionButton() {
    return (
        <NavLink
            to="/chat"
            className="flex self-center cursor-pointer text-cBlack h-full w-full"
        >
            <button type="button">
                <MdOutlineChatBubbleOutline size="1.5em" />
            </button>
        </NavLink>
    );
}
