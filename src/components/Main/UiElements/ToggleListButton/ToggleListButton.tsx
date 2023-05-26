import React from 'react';
import { MdExpandMore } from 'react-icons/md';
import './ToggleListButton.css';

type ToggleListButtonProps = {
    onToggleListButtonClick: () => void;
    isMenuOpen?: boolean;
};

export default function ToggleListButton({
    onToggleListButtonClick,
    isMenuOpen,
}: ToggleListButtonProps) {
    return (
        <div
            className={`ml-auto rotate-on-hover ${
                isMenuOpen ? 'rotate-up' : 'rotate-down'
            }`}
            onClick={onToggleListButtonClick}
        >
            <MdExpandMore size="2em" />
        </div>
    );
}
