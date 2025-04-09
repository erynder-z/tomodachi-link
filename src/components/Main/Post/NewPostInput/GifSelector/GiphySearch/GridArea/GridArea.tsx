import { GiphyGif } from '../../../../../../../types/miscTypes';
import LoadingSpinner from '../../../../../../UiElements/LoadingSpinner/LoadingSpinner';

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
            className="flex-grow overflow-y-auto relative"
            style={{ height: gridHeight }}
        >
            {/* Loading State */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center w-60">
                    <LoadingSpinner />
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-center py-5 text-red-600 dark:text-red-400">
                        Error: {error}
                    </p>
                </div>
            )}

            {/* No Results State */}
            {!isLoading && !error && gifs.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-center py-5 text-gray-500 dark:text-gray-400">
                        No results found.
                    </p>
                </div>
            )}

            {/* GIF Grid */}
            <div
                className={isLoading ? 'invisible' : 'grid grid-cols-3 gap-1.5'}
            >
                {!isLoading &&
                    gifs.map((gif) => (
                        <button
                            key={gif.id}
                            onClick={() => handleGifItemClick(gif)}
                            aria-label={gif.title || 'Select GIF'}
                            className="w-20 aspect-square overflow-hidden rounded bg-gray-200 dark:bg-gray-700 flex justify-center items-center cursor-pointer transition-all duration-150 ease-in-out hover:border-4 hover:border-highlight dark:hover:border-highlightDark justify-self-center"
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
