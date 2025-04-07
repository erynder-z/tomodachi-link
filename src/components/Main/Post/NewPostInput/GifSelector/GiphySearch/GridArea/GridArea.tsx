import { GiphyGif } from '../../../../../../../types/miscTypes';

type GridAreaProps = {
    gridHeight: string;
    isLoading: boolean;
    error: string | null;
    gifs: GiphyGif[];
    handleGifItemClick: (gif: GiphyGif) => void;
};

export default function GridArea({
    gridHeight,
    isLoading,
    error,
    gifs,
    handleGifItemClick,
}: GridAreaProps): JSX.Element {
    /**
     * Renders the seach bar.
     * @returns {JSX.Element} - Rendered search bar.
     */
    return (
        <div
            className="flex-grow overflow-y-auto"
            style={{ height: gridHeight }}
        >
            {/* Loading State */}
            {isLoading && gifs.length === 0 && (
                <p className="text-center py-5 text-gray-500 dark:text-gray-400">
                    Loading...
                </p>
            )}

            {/* Error State */}
            {error && (
                <p className="text-center py-5 text-red-600 dark:text-red-400">
                    Error: {error}
                </p>
            )}

            {/* No Results State */}
            {!isLoading && !error && gifs.length === 0 && (
                <p className="text-center py-5 text-gray-500 dark:text-gray-400">
                    No results found.
                </p>
            )}

            {/* GIF Grid */}
            <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-1.5">
                {!isLoading &&
                    gifs.map((gif) => (
                        <button
                            key={gif.id}
                            onClick={() => handleGifItemClick(gif)}
                            aria-label={gif.title || 'Select GIF'}
                            className="w-full aspect-square overflow-hidden rounded bg-gray-200 dark:bg-gray-700 flex justify-center items-center curs or-pointer transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-sky-500 dark:focus:ring-offset-gray-800 hover:ring-2 hover:ring-offset-1 hover:ring-blue-500 dark:hover:ring-sky-400"
                        >
                            <img
                                src={gif.images?.fixed_width?.url}
                                alt={gif.title || 'Giphy GIF'}
                                loading="lazy"
                                className="block w-full h-full object-cover"
                            />
                        </button>
                    ))}
            </div>
        </div>
    );
}
