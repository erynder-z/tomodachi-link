import React from 'react';
import { MdOutlineCoPresent } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function ProfilePageButton() {
    return (
        <Link
            to={'/mypage'}
            className="cursor-pointer hover:drop-shadow-md hover:text-blue-400"
        >
            <MdOutlineCoPresent size="1.5em" />
        </Link>
    );
}
