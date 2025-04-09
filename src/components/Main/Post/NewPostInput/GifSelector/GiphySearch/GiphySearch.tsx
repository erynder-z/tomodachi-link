import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';

import useAuth from '../../../../../../hooks/useAuth';
import {
    GiphyApiResponse,
    GiphyGif,
    GiphySearchProps,
} from '../../../../../../types/miscTypes';
import SearchBar from './SearchBar/SearchBar';
import GridArea from './GridArea/GridArea';

export default function GiphySearch({
    onGifClick,
    gridHeight = '300px',
}: GiphySearchProps): JSX.Element {
    const { token } = useAuth();
    const [gifs, setGifs] = useState<GiphyGif[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Makes a request to the server to search for Giphy GIFs with the given term,
     * and returns the response as a GiphyApiResponse.
     *
     * @param term - The search term to query Giphy for.
     * @param token - The authentication token to send with the request.
     * @returns The server response as a GiphyApiResponse.
     */
    async function performGiphySearch(
        term: string,
        token: string | null
    ): Promise<GiphyApiResponse> {
        if (!token) throw new Error('Authentication token is missing.');
        const headers = { Authorization: `Bearer ${token}` };
        const SERVER_URL = import.meta.env.VITE_SERVER_URL || '';
        const url = `${SERVER_URL}/api/v1/giphy-search?query=${encodeURIComponent(
            term
        )}`;

        const res = await fetch(url, { headers });
        if (!res.ok) {
            let message = `Error: ${res.status} ${res.statusText}`;
            try {
                const errData = await res.json();
                message = errData.message || message;
            } catch (e) {
                console.error('Could not parse error response:', e);
            }
            throw new Error(message);
        }
        return res.json();
    }

    /**
     * Makes a request to the server to get the trending Giphy GIFs,
     * and returns the response as a GiphyApiResponse.
     *
     * @param token - The authentication token to send with the request.
     * @returns The server response as a GiphyApiResponse.
     */
    async function performGiphyTrending(
        token: string | null
    ): Promise<GiphyApiResponse> {
        if (!token) throw new Error('Authentication token is missing.');
        const headers = { Authorization: `Bearer ${token}` };
        const SERVER_URL = import.meta.env.VITE_SERVER_URL || '';
        const url = `${SERVER_URL}/api/v1/giphy-trending`;

        const res = await fetch(url, { headers });
        if (!res.ok) {
            let message = `Error: ${res.status} ${res.statusText}`;
            try {
                const errData = await res.json();
                message = errData.message || message;
            } catch (e) {
                console.error('Could not parse error response:', e);
            }
            throw new Error(message);
        }
        return res.json();
    }

    /**
     * Fetches GIFs from the server. If the term is not empty, performs a search.
     * Otherwise, fetches trending GIFs.
     *
     * @param term - The search term.
     * @returns A Promise that resolves after the GIFs are fetched.
     */
    const fetchGifs = async (term: string): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            const giphyData = term.trim()
                ? await performGiphySearch(term, token)
                : await performGiphyTrending(token);
            setGifs(giphyData.data || []);
        } catch (err: unknown) {
            const error = err as Error;
            console.error('Failed to load GIFs:', error.message);
            setError(error.message);
            setGifs([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (gifs.length === 0) {
            fetchGifs('');
        }
    }, [fetchGifs]);

    /**
     * Handles the form submission for searching for GIFs.
     * If the search term is not empty, performs a search.
     * Otherwise, fetches trending GIFs.
     *
     * @param event - The form submission event.
     */
    const handleSearchSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if (searchTerm.trim()) {
            fetchGifs(searchTerm);
        } else {
            fetchGifs('');
        }
    };

    /**
     * Handles input change in the search input field.
     * Sets the `searchTerm` state variable to the current input value.
     *
     * @param {ChangeEvent<HTMLInputElement>} event - The change event.
     * @returns {void} No return value.
     */
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearchTerm(event.target.value);
    };

    /**
     * Handles the click event for an individual GIF item in the grid.
     * Calls the `onGifClick` prop function with the selected GIF.
     *
     * @param {GiphyGif} gif - The selected GIF object.
     * @returns {void} No return value.
     */
    const handleGifItemClick = (gif: GiphyGif): void => {
        onGifClick(gif);
    };

    /**
     * The rendered Giphy search component.
     *
     * @type {JSX.Element}
     */
    return (
        <div
            className={`bg-background1 dark:bg-background1Dark text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 border rounded-lg p-4 flex flex-col overflow-hidden max-w-screen`}
        >
            <div className="h-full flex flex-col">
                <SearchBar
                    searchTerm={searchTerm}
                    isLoading={isLoading}
                    handleSearchSubmit={handleSearchSubmit}
                    handleInputChange={handleInputChange}
                />

                <GridArea
                    gridHeight={gridHeight}
                    isLoading={isLoading}
                    error={error}
                    gifs={gifs}
                    handleGifItemClick={handleGifItemClick}
                />
            </div>
            <span>Powered by Giphy</span>
        </div>
    );
}
