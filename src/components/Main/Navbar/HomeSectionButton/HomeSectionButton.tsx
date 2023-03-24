import React from 'react';
import { MdHomeFilled } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function HomeSectionButton() {
    const handleHomeSectionButtonClick = () => {
        console.log('test');
    };
    return (
        <Link to="/home" className="flex self-center cursor-pointer">
            <button type="button" onClick={handleHomeSectionButtonClick}>
                <MdHomeFilled size="1.5em" />
            </button>
        </Link>
    );
}
