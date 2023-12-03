import { SearchModeType } from '../../../types/searchTypes';

type SearchModeSelectProps = {
    searchMode: SearchModeType;
    setSearchMode: React.Dispatch<React.SetStateAction<SearchModeType>>;
    clearSearch: () => void;
};

export default function SearchModeSelect({
    searchMode,
    setSearchMode,
    clearSearch,
}: SearchModeSelectProps) {
    return (
        <ol className="flex w-full justify-between text-regularTextDark">
            <li
                className={`w-full text-center cursor-pointer
                    ${
                        searchMode === 'all'
                            ? 'bg-highlight dark:bg-highlightDark rounded'
                            : ''
                    }
                        `}
                onClick={() => {
                    setSearchMode('all');
                    clearSearch();
                }}
            >
                All
            </li>
            <li
                className={`w-full text-center cursor-pointer
                 ${
                     searchMode === 'users'
                         ? 'bg-highlight dark:bg-highlightDark rounded'
                         : ''
                 }
                     `}
                onClick={() => {
                    setSearchMode('users');
                    clearSearch();
                }}
            >
                Users
            </li>
            <li
                className={`w-full text-center cursor-pointer
                 ${
                     searchMode === 'posts'
                         ? 'bg-highlight dark:bg-highlightDark rounded'
                         : ''
                 }
                     `}
                onClick={() => {
                    setSearchMode('posts');
                    clearSearch();
                }}
            >
                Posts
            </li>
            <li
                className={`w-full text-center cursor-pointer
                  ${
                      searchMode === 'polls'
                          ? 'bg-highlight dark:bg-highlightDark rounded'
                          : ''
                  }
                      `}
                onClick={() => {
                    setSearchMode('polls');
                    clearSearch();
                }}
            >
                Polls
            </li>
        </ol>
    );
}
