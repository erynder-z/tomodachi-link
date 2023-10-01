import { useState, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import { MinimalUserTypes } from '../../../../types/otherUserTypes';
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

    const handleTextareaChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setSearchText(event.target.value);

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

    const CloseButton = (
        <button
            className="absolute top-0 right-0 m-4 text-regularTextDark font-bold text-lg"
            onClick={handleCloseButtonClick}
        >
            <FaTimes />
        </button>
    );

    const SearchInput = (
        <>
            <input
                name="searchInput"
                required
                autoComplete="off"
                className="block py-2.5 px-0 w-full text-sm text-regularTextDark bg-transparent border-0 border-b-2  appearance-none focus:outline-none focus:ring-0 focus:border-highlight dark:focus:border-highlightDark peer"
                placeholder=" "
                value={searchText}
                onChange={handleTextareaChange}
            />
            <label
                htmlFor="searchInput"
                className="absolute text-sm text-regularTextDark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-highlight dark:peer-focus:text-highlightDark peer-focus:font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
                Search for user
            </label>
        </>
    );

    const Loading = (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <LoadingSpinner message="Searching" />
        </div>
    );

    const SearchResults = (
        <ul
            className={`w-full p-2 bg-slate-800/80 peer-focus:bg-white/70 dark:peer-focus:bg-white/20 overflow-auto ${
                shouldSearchOverlayShow ? 'max-h-[50vh]' : ''
            }`}
        >
            {searchResults?.map((user: MinimalUserTypes) => (
                <div key={user._id} onClick={handleCloseButtonClick}>
                    <UserListItem listItemData={user} />
                </div>
            ))}
        </ul>
    );

    const SpyGlassIcon = (
        <div className="flex justify-center items-center">
            <span className="text-6xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                🔍
            </span>
        </div>
    );

    const NoResultsFound = (
        <div className="flex justify-center items-center">
            <span className="text-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-regularTextDark">
                🌵 No results found
            </span>
        </div>
    );

    const ClearButton = (
        <button
            className="absolute -top-5 right-2 text-regularTextDark hover:text-highlight dark:hover:text-highlightDark text-xs"
            onClick={handleClear}
        >
            Clear
        </button>
    );

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden  flex flex-col items-center justify-center gap-4 transition-opacity bg-black/80">
            {CloseButton}
            <div className="h-screen w-full md:w-1/3 lg:flex mt-40 justify-center">
                <div className="relative z-0 px-4 w-full" ref={dropdownRef}>
                    {SearchInput}
                    {isLoading
                        ? Loading
                        : searchResults.length > 0 &&
                          Array.isArray(searchResults)
                        ? SearchResults
                        : searchText
                        ? NoResultsFound
                        : SpyGlassIcon}
                    {searchText && ClearButton}
                </div>
            </div>
        </div>
    );
}
