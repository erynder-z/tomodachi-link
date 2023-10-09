import { useEffect, useRef, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import LoadingSpinner from '../UiElements/LoadingSpinner/LoadingSpinner';
import {
    SearchResultPollType,
    SearchResultPostType,
    SearchResultType,
    SearchResultUserType,
} from '../../types/searchTypes';
import SearchResultsUserListItem from './SearchResults/SearchResultsUserItem/SearchResultsUserItem';
import SearchResultsPostItem from './SearchResults/SearchResultsPostItem/SearchResultsPostItem';
import SearchResultsPollItem from './SearchResults/SearchResultsPollItem/SearchResultsPollItem';

type SearchPropsType = {
    handleCloseButtonClick: () => void;
};

export default function Search({ handleCloseButtonClick }: SearchPropsType) {
    const { token } = useAuth();
    const [searchText, setSearchText] = useState<string>('');
    const [searchResults, setSearchResults] = useState<SearchResultType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                setIsLoading(true);
                const serverURL = import.meta.env.VITE_SERVER_URL;
                const response = await fetch(
                    `${serverURL}/api/v1/search?query=${searchText}`,
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

    const handleClear = () => {
        setSearchText('');
        setSearchResults([]);
    };

    const getSearchResultComponent = (resultItem: SearchResultType) => {
        switch (resultItem.type) {
            case 'user':
                return (
                    <SearchResultsUserListItem
                        itemData={resultItem.data as SearchResultUserType}
                    />
                );
            case 'post':
                return (
                    <SearchResultsPostItem
                        itemData={resultItem.data as SearchResultPostType}
                        queryString={searchText}
                    />
                );
            case 'poll':
                return (
                    <SearchResultsPollItem
                        itemData={resultItem.data as SearchResultPollType}
                        queryString={searchText}
                    />
                );
            default:
                return null;
        }
    };

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
                Search for user, post or poll
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
            className="w-full p-2 bg-slate-800/80 peer-focus:bg-white/70 dark:peer-focus:bg-white/20 overflow-auto ${
            max-h-[50vh]"
        >
            {searchResults?.map((resultItem: SearchResultType) => (
                <div key={resultItem.data._id} onClick={handleCloseButtonClick}>
                    {getSearchResultComponent(resultItem)}
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
        <div className="relative z-0 px-4 w-full" ref={dropdownRef}>
            {SearchInput}
            {isLoading
                ? Loading
                : searchResults.length > 0 && Array.isArray(searchResults)
                ? SearchResults
                : searchText
                ? NoResultsFound
                : SpyGlassIcon}
            {searchText && ClearButton}
        </div>
    );
}
