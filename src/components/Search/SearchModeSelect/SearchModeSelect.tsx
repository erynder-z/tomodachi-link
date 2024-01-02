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
    const options: SearchModeType[] = ['all', 'users', 'posts', 'polls'];
    return (
        <ol className="flex w-full justify-between text-regularTextDark">
            {options.map((mode) => (
                <li
                    key={mode}
                    className={`list-none w-full text-center cursor-pointer relative transition-all ${
                        searchMode === mode
                            ? 'bg-highlight dark:bg-highlightDark rounded-3xl'
                            : ''
                    }`}
                    onClick={() => {
                        setSearchMode(mode);
                        clearSearch();
                    }}
                >
                    <span>{mode.charAt(0).toUpperCase() + mode.slice(1)}</span>
                </li>
            ))}
        </ol>
    );
}
