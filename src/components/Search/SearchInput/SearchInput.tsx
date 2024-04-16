import { useRef, useState } from 'react';
import { SearchModeType } from '../../../types/searchTypes';

type SearchInputProps = {
    searchText: string;
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
    searchMode: SearchModeType;
};

/**
 * React component for rendering a search input in the search interface.
 *
 * @component
 * @param {SearchInputProps} props - The component props.
 * @param {string} props.searchText - The current search text.
 * @param {React.Dispatch<React.SetStateAction<string>>} props.setSearchText - Function to update the search text.
 * @param {SearchModeType} props.searchMode - The current search mode.
 * @returns {JSX.Element} The rendered SearchInput component.
 */
export default function SearchInput({
    searchText,
    setSearchText,
    searchMode,
}: SearchInputProps): JSX.Element {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    /**
     * Event handler for input change.
     *
     * @function
     * @param {React.ChangeEvent<HTMLInputElement>} event - The change event.
     * @returns {void}
     */
    const handleTextareaChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => setSearchText(event.target.value);

    /**
     * Generates the input placeholder message based on the search mode.
     *
     * @function
     * @returns {string} The input placeholder message.
     */
    const inputMessage = (() => {
        switch (searchMode) {
            case 'all':
                return 'Search for user, post or poll';
            case 'users':
                return 'Search for users';
            case 'posts':
                return 'Search for posts';
            case 'polls':
                return 'Search for polls';
            default:
                return 'Search for user, post or poll';
        }
    })();

    /**
     * Render the SearchInput component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="relative">
            <input
                ref={inputRef}
                name="searchInput"
                required
                autoComplete="off"
                autoFocus
                className="block py-2.5 px-2 w-full text-sm text-regularTextDark bg-transparent border-0  appearance-none focus:outline-none focus:ring-0 focus:border-highlight dark:focus:border-highlightDark peer"
                placeholder=" "
                value={searchText}
                onChange={handleTextareaChange}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
            />
            <label
                htmlFor="searchInput"
                className="absolute text-sm px-2 text-regularTextDark duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-highlight dark:peer-focus:text-highlightDark peer-focus:font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
                {inputMessage}
            </label>
            <div className=" w-full h-1 rounded-full overflow-hidden">
                <div
                    className={`h-full w-full  ${
                        isInputFocused
                            ? 'bg-highlight dark:bg-highlightDark '
                            : 'animate-colorChangeAnimationBright dark:animate-colorChangeAnimationDark '
                    } `}
                />
            </div>
        </div>
    );
}
