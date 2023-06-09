import React, { useState, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import { MdPersonSearch } from 'react-icons/md';
import { MinimalUserTypes } from '../../../types/minimalUserTypes';
import useAuth from '../../../hooks/useAuth';
import UserListItem from '../UserList/UserListItem/UserListItem';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

type SearchOverlayProps = {
    shouldSearchOverlayShow: boolean;
    onClose: () => void;
};

export default function SearchOverlay({
    shouldSearchOverlayShow,
    onClose,
}: SearchOverlayProps) {
    const { token } = useAuth();
    const [searchText, setSearchText] = useState<string>('');
    const [searchResults, setSearchResults] = useState<MinimalUserTypes[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                setIsLoading(true);
                const serverURL = import.meta.env.VITE_SERVER_URL;
                const response = await fetch(
                    `${serverURL}/api/v1/users?query=${searchText}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (searchText) {
            fetchSearchResults();
        } else {
            setSearchResults([]);
        }
    }, [searchText]);

    const handleTextareaChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearchText(event.target.value);
    };

    const handleClear = () => {
        setSearchText('');
        setSearchResults([]);
    };

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800/80 transition-opacity z-50">
            <button
                className="absolute top-0 right-0 m-4 text-white font-bold text-lg"
                onClick={onClose}
            >
                <FaTimes />
            </button>
            <div className="h-screen lg:flex mt-40 justify-center">
                <div className="relative px-4" ref={dropdownRef}>
                    <input
                        name="searchInput"
                        required
                        autoComplete="off"
                        className="peer w-full sm:w-96 p-2 text-gray-200 leading-tight outline-none bg-slate-800/80 focus:bg-indigo-800/50 h-8 overflow-hidden resize-none rounded-sm transition-colors duration-300"
                        value={searchText}
                        onChange={handleTextareaChange}
                    />
                    <label
                        htmlFor="searchInput"
                        className={`${
                            searchText ? '-top-5' : 'top-1'
                        } absolute left-7 text-gray-400 text-sm transition-all peer-focus:-top-5 peer-focus:text-xs pointer-events-none`}
                    >
                        Search for user...
                    </label>
                    {isLoading ? (
                        <div className="w-full sm:w-96 h p-2 bg-slate-800/80 text-gray-200 peer-focus:bg-indigo-800/50">
                            <LoadingSpinner />
                        </div>
                    ) : searchResults.length > 0 &&
                      Array.isArray(searchResults) ? (
                        <ul
                            className="w-95vw sm:w-96 h p-2 bg-slate-800/80 text-gray-200 peer-focus:bg-indigo-800/50"
                            style={{
                                maxHeight: shouldSearchOverlayShow
                                    ? '50vh'
                                    : '0',
                            }}
                        >
                            {searchResults?.map((user: MinimalUserTypes) => (
                                <div onClick={onClose}>
                                    <UserListItem
                                        key={user._id}
                                        listItemData={user}
                                    />
                                </div>
                            ))}
                        </ul>
                    ) : (
                        <div className="flex justify-center items-center">
                            <MdPersonSearch className="text-gray-200 text-6xl mt-10" />
                        </div>
                    )}
                    {searchText && (
                        <button
                            className="absolute -top-5 right-2 text-gray-400 hover:text-gray-200 text-xs"
                            onClick={handleClear}
                        >
                            Clear
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
