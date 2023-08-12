import React from 'react';
import { MdSearch } from 'react-icons/md';

type SearchButtonProps = {
    handleSearchButtonClick: () => void;
};

export default function SearchButton({
    handleSearchButtonClick,
}: SearchButtonProps) {
    return (
        <button
            type="button"
            onClick={handleSearchButtonClick}
            className="flex self-center cursor-pointer text-cBlack h-full w-full"
        >
            <MdSearch size="1.5em" />
        </button>
    );
}
