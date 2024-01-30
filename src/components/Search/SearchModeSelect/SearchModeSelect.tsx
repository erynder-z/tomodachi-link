import { SearchModeType } from '../../../types/searchTypes';

type SearchModeSelectProps = {
    searchMode: SearchModeType;
    setSearchMode: React.Dispatch<React.SetStateAction<SearchModeType>>;
    clearSearch: () => void;
};

/**
 * React component for rendering a selection menu for search modes in the search interface.
 *
 * @component
 * @param {SearchModeSelectProps} props - The component props.
 * @param {SearchModeType} props.searchMode - The current search mode.
 * @param {React.Dispatch<React.SetStateAction<SearchModeType>>} props.setSearchMode - Function to update the search mode.
 * @param {() => void} props.clearSearch - Callback function to clear the search.
 * @returns {JSX.Element} The rendered SearchModeSelect component.
 */
export default function SearchModeSelect({
    searchMode,
    setSearchMode,
    clearSearch,
}: SearchModeSelectProps): JSX.Element {
    const options: SearchModeType[] = ['all', 'users', 'posts', 'polls'];

    /**
     * Render the SearchModeSelect component.
     *
     * @type {JSX.Element}
     */
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
