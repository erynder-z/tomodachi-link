import {
    SearchResultPollType,
    SearchResultPostType,
    SearchResultType,
    SearchResultUserType,
} from '../../../types/searchTypes';
import SearchResultsUserListItem from './SearchResultsUserItem/SearchResultsUserItem';
import SearchResultsPostItem from './SearchResultsPostItem/SearchResultsPostItem';
import SearchResultsPollItem from './SearchResultsPollItem/SearchResultsPollItem';
import { motion } from 'framer-motion';

type SearchResultsProps = {
    searchText: string;
    searchResults: SearchResultType[];
    handleCloseButtonClick: () => void;
};

/**
 * React component for rendering the search results list.
 *
 * @component
 * @param {SearchResultsProps} props - The component props.
 * @param {string} props.searchText - The search text used for highlighting.
 * @param {SearchResultType[]} props.searchResults - The array of search results.
 * @param {() => void} props.handleCloseButtonClick - Callback function to handle the close button click.
 * @returns {JSX.Element} The rendered SearchResults component.
 */
export default function SearchResults({
    searchText,
    searchResults,
    handleCloseButtonClick,
}: SearchResultsProps): JSX.Element {
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

    /**
     * Render the getSearchResultComponent component.
     *
     * @type {JSX.Element}
     */
    return (
        <ul className="w-full p-2 bg-white/70 dark:bg-white/20 overflow-auto max-h-[50vh] overflow-x-hidden">
            {searchResults?.map((resultItem: SearchResultType, index) => (
                <motion.li
                    key={resultItem.data._id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{
                        type: 'spring',
                        bounce: 0,
                        duration: 0.3,
                        delay: index * 0.03,
                    }}
                    onClick={handleCloseButtonClick}
                >
                    {getSearchResultComponent(resultItem)}
                </motion.li>
            ))}
        </ul>
    );
}
