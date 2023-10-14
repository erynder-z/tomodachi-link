import { SearchResultType } from '../../../types/searchTypes';

type ClearButtonProps = {
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
    setSearchResults: React.Dispatch<React.SetStateAction<SearchResultType[]>>;
};

export default function ClearButton({
    setSearchText,
    setSearchResults,
}: ClearButtonProps) {
    const handleClear = () => {
        setSearchText('');
        setSearchResults([]);
    };

    return (
        <button
            className="absolute -top-5 right-2 text-regularTextDark hover:text-highlight dark:hover:text-highlightDark text-xs"
            onClick={handleClear}
        >
            Clear
        </button>
    );
}
