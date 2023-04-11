import React from 'react';
import { TbUserCircle } from 'react-icons/tb';
import { Link } from 'react-router-dom';

export default function ProfilePageButton() {
    return (
        <Link
            to={'/mypage'}
            className="cursor-pointer hover:drop-shadow-md hover:text-blue-400"
        >
            <TbUserCircle size="1.5em" />
        </Link>
    );
}
