import React from 'react';
import { MdOutlineChatBubbleOutline } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

type ChatSectionButtonProps = {
    isChatDisabled: boolean;
};

export default function ChatSectionButton({
    isChatDisabled,
}: ChatSectionButtonProps) {
    return (
        <div
            className={`flex self-center cursor-pointer text-cBlack h-full w-full ${
                isChatDisabled ? 'disabled' : ''
            }`}
        >
            {isChatDisabled ? (
                <button type="button" disabled>
                    <MdOutlineChatBubbleOutline size="1.5em" />
                </button>
            ) : (
                <NavLink to="/chat" className="h-full w-full text-black">
                    <MdOutlineChatBubbleOutline size="1.5em" />
                </NavLink>
            )}
        </div>
    );
}
