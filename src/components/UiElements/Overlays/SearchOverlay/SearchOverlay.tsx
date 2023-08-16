import React, { useState, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import { MdPersonSearch } from 'react-icons/md';
import { MinimalUserTypes } from '../../../../types/minimalUserTypes';
import useAuth from '../../../../hooks/useAuth';
import UserListItem from '../../../Main/UserList/UserListItem/UserListItem';
import LoadingSpinner from '../../../UiElements/LoadingSpinner/LoadingSpinner';

type SearchOverlayProps = {
    shouldSearchOverlayShow: boolean;
    setShouldOverlaysShow: React.Dispatch<
        React.SetStateAction<{
            searchOverlay: boolean;
            editUserDataModal: boolean;
            mobileOptionsModal: boolean;
            guestAccountOverlay: boolean;
        }>
    >;
};

export default function SearchOverlay({
    shouldSearchOverlayShow,
    setShouldOverlaysShow,
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

    const handleCloseButtonClick = () => {
        setShouldOverlaysShow({
            searchOverlay: false,
            editUserDataModal: false,
            mobileOptionsModal: false,
            guestAccountOverlay: false,
        });
    };

    const handleClear = () => {
        setSearchText('');
        setSearchResults([]);
    };

    return (
        <div
            className={`${
                shouldSearchOverlayShow
                    ? 'animate-inAnimation'
                    : 'animate-outAnimation'
            } fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden  flex flex-col items-center justify-center gap-4 transition-opacity bg-gray-700/90`}
        >
            <button
                className="absolute top-0 right-0 m-4 text-white font-bold text-lg"
                onClick={handleCloseButtonClick}
            >
                <FaTimes />
            </button>
            <div className="h-screen lg:flex mt-40 justify-center">
                <div className="relative z-0 px-4" ref={dropdownRef}>
                    <input
                        name="searchInput"
                        required
                        autoComplete="off"
                        className="block py-2.5 px-0 w-full sm:w-96 text-sm text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cPink peer"
                        placeholder=" "
                        value={searchText}
                        onChange={handleTextareaChange}
                    />
                    <label
                        htmlFor="searchInput"
                        className="absolute text-sm text-gray-100 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cPink peer-focus:font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                            className="w-95vw sm:w-96 h p-2 bg-slate-800/80 text-gray-200 peer-focus:bg-white/50"
                            style={{
                                maxHeight: shouldSearchOverlayShow
                                    ? '50vh'
                                    : '0',
                            }}
                        >
                            {searchResults?.map((user: MinimalUserTypes) => (
                                <div
                                    key={user._id}
                                    onClick={handleCloseButtonClick}
                                >
                                    <UserListItem listItemData={user} />
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
                            className="absolute -top-5 right-2 text-gray-100 hover:text-gray-200 text-xs"
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
