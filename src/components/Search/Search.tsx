import { useEffect, useRef, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import LoadingSpinner from '../UiElements/LoadingSpinner/LoadingSpinner';
import { SearchModeType, SearchResultType } from '../../types/searchTypes';
import SearchInput from './SearchInput/SearchInput';
import SearchResults from './SearchResults/SearchResults';
import SpyGlassIcon from './SpyGlassIcon/SpyGlassIcon';
import NoResultsFound from './SearchResults/NoResultsFound/NoResultsFound';
import ClearButton from './ClearButton/ClearButton';
import { FetchStatusType } from '../../types/miscTypes';
import { AnimatePresence } from 'framer-motion';
import SearchModeSelect from './SearchModeSelect/SearchModeSelect';

type SearchPropsType = {
    handleCloseButtonClick: () => void;
    defaultSearchMode?: SearchModeType;
};

const DEBOUNCE_TIMEOUT = 500;
const USER_NOTIFICATION_TIMEOUT = 3000;
const USER_ERROR_NOTIFICATION_TIMEOUT = 15000;

/**
 * React component for rendering a search interface.
 *
 * @component
 * @param {SearchPropsType} props - The component props.
 * @param {() => void} props.handleCloseButtonClick - Callback function for closing the search interface.
 * @param {SearchModeType} [props.defaultSearchMode] - Default search mode.
 * @returns {JSX.Element} The rendered Search component.
 */
export default function Search({
    handleCloseButtonClick,
    defaultSearchMode,
}: SearchPropsType) {
    const { token } = useAuth();
    const [searchText, setSearchText] = useState<string>('');
    const [searchResults, setSearchResults] = useState<SearchResultType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [fetchStatus, setFetchStatus] = useState<FetchStatusType>('idle');
    const [isDebouncing, setIsDebouncing] = useState<boolean>(false);
    const [searchMode, setSearchMode] = useState<SearchModeType>(
        defaultSearchMode || 'all'
    );
    const dropdownRef = useRef<HTMLDivElement>(null);
    const debounce = useRef<NodeJS.Timeout | null>(null);

    /**
     * Clears the search input and results.
     *
     * @function
     * @returns {void}
     */
    const clearSearch = () => {
        setSearchText('');
        setSearchResults([]);
    };

    /**
     * useEffect hook to fetch search results when the search text changes.
     *
     * @effect
     * @returns {void}
     */
    useEffect(() => {
        const fetchSearchResults = async () => {
            const delayedNotificationTimeout = setTimeout(() => {
                setFetchStatus('delayed');
            }, USER_NOTIFICATION_TIMEOUT);

            const errorNotificationTimeout = setTimeout(() => {
                setFetchStatus('error');
            }, USER_ERROR_NOTIFICATION_TIMEOUT);

            try {
                setIsDebouncing(false);
                setIsLoading(true);
                setFetchStatus('fetching');

                const SERVER_URL = import.meta.env.VITE_SERVER_URL;

                const response = await fetch(
                    `${SERVER_URL}/api/v1/search?query=${searchText}&searchMode=${searchMode}`,
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
                clearTimeout(delayedNotificationTimeout);
                clearTimeout(errorNotificationTimeout);
                setFetchStatus('idle');
                setIsLoading(false);
            }
        };

        if (debounce.current) {
            clearTimeout(debounce.current);
        }

        setIsDebouncing(true);
        debounce.current = setTimeout(() => {
            if (searchText) {
                fetchSearchResults();
            } else {
                setSearchResults([]);
            }
        }, DEBOUNCE_TIMEOUT);
    }, [searchText]);

    /**
     * JSX Element representing the loading spinner.
     *
     * @type {JSX.Element}
     */
    const Loading = (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <LoadingSpinner
                message={
                    fetchStatus === 'delayed'
                        ? 'Your request is taking longer than normal'
                        : fetchStatus === 'error'
                        ? 'It should not take this long...Try refreshing the page!'
                        : 'Searching'
                }
            />
        </div>
    );

    /**
     * Render the search interface based on the search and loading states.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="relative z-0 px-4 w-full" ref={dropdownRef}>
            <div className="flex flex-col gap-8">
                <SearchModeSelect
                    searchMode={searchMode}
                    setSearchMode={setSearchMode}
                    clearSearch={clearSearch}
                />
                <SearchInput
                    searchText={searchText}
                    setSearchText={setSearchText}
                    searchMode={searchMode}
                />
            </div>
            <AnimatePresence>
                {isDebouncing && searchText ? (
                    Loading
                ) : isLoading ? (
                    Loading
                ) : searchResults.length > 0 && Array.isArray(searchResults) ? (
                    <SearchResults
                        key="searchResults"
                        searchText={searchText}
                        searchResults={searchResults}
                        handleCloseButtonClick={handleCloseButtonClick}
                    />
                ) : searchText ? (
                    <NoResultsFound />
                ) : (
                    <SpyGlassIcon />
                )}
                {searchText && (
                    <ClearButton key="ClearButton" clearSearch={clearSearch} />
                )}{' '}
            </AnimatePresence>
        </div>
    );
}
