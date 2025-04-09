import { FaSearch } from 'react-icons/fa';

type SearchBarProps = {
    searchTerm: string;
    isLoading: boolean;
    handleSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchBar({
    searchTerm,
    isLoading,
    handleSearchSubmit,
    handleInputChange,
}: SearchBarProps): JSX.Element {
    /**
     * Renders the seach bar.
     * @returns {JSX.Element} - Rendered search bar.
     */
    return (
        <form onSubmit={handleSearchSubmit} className="flex mb-4 gap-2 ">
            <input
                type="text"
                placeholder="Search Giphy..."
                value={searchTerm}
                onChange={handleInputChange}
                className="w-3/4 flex-grow p-2 rounded border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-sky-500 focus:border-transparent disabled:opacity-50"
                disabled={isLoading}
            />
            <button
                type="submit"
                className="w-1/4 flex items-center justify-center rounded-md text-regularTextDark ml-auto text-sm duration-300 bg-button dark:bg-buttonDark hover:bg-buttonHover dark:hover:bg-buttonDarkHover disabled:bg-gray-500 disabled:hover:bg-gray-600"
                disabled={isLoading}
            >
                {isLoading ? '...' : <FaSearch />}
            </button>
        </form>
    );
}
