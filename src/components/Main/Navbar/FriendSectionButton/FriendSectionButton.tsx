import React from 'react';
import { TbFriends } from 'react-icons/tb';
import { Link } from 'react-router-dom';

export default function FriendSectionButton() {
    const handleFriendSectionButtonClick = () => {
        console.log('test');
    };
    return (
        <Link to="/friends" className="flex self-center cursor-pointer">
            <button type="button" onClick={handleFriendSectionButtonClick}>
                <TbFriends size="1.5em" />
            </button>
        </Link>
    );
}
