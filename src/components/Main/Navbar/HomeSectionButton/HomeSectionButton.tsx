import React from 'react';
import { GrHome } from 'react-icons/gr';
import { Link } from 'react-router-dom';

export default function HomeSectionButton() {
    const handleHomeSectionButtonClick = () => {
        console.log('test');
    };
    return (
        <Link to="/home" className="ml-auto cursor-pointer">
            <button type="button" onClick={handleHomeSectionButtonClick}>
                <GrHome size="1.5em" />
            </button>
        </Link>
    );
}
