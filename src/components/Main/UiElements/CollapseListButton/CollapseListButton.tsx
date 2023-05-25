import React from 'react';
import './CollapseListButton.css';
import { MdExpandLess } from 'react-icons/md';

type CollapseListButtonProps = {
    onCollapseListButtonClick: () => void;
};

export default function CollapseListButton({
    onCollapseListButtonClick,
}: CollapseListButtonProps) {
    return (
        <MdExpandLess
            size="2em"
            className="ml-auto rotate-on-hover"
            onClick={onCollapseListButtonClick}
        />
    );
}
