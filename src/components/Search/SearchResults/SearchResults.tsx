import {
    SearchResultPollType,
    SearchResultPostType,
    SearchResultType,
    SearchResultUserType,
} from '../../../types/searchTypes';
import SearchResultsUserListItem from './SearchResultsUserItem/SearchResultsUserItem';
import SearchResultsPostItem from './SearchResultsPostItem/SearchResultsPostItem';
import SearchResultsPollItem from './SearchResultsPollItem/SearchResultsPollItem';

type SearchResultsProps = {
    searchText: string;
    searchResults: SearchResultType[];
    handleCloseButtonClick: () => void;
};

export default function SearchResults({
    searchText,
    searchResults,
    handleCloseButtonClick,
}: SearchResultsProps) {
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
    return (
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
}
