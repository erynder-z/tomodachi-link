/**
 * Asynchronous function to fetch the Tenor API key from the server.
 *
 * @async
 * @function
 * @param {string | null} token - The authentication token for the request.
 * @param {(key: string) => void} [setApiKey] - Optional function to set the API key in the component state.
 * @returns {Promise<void>} A promise that resolves after fetching and setting the API key.
 */
export const fetchTenorApiKey = async (
    token: string | null,
    setApiKey?: (key: string) => void
) => {
    try {
        const SERVER_URL = import.meta.env.VITE_SERVER_URL;
        const response = await fetch(`${SERVER_URL}/api/v1/key/tenor`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            setApiKey?.(data.key);
        } else {
            console.error(
                `Server returned ${response.status} ${response.statusText}`
            );
        }
    } catch (error) {
        console.error('Could not get API key');
    }
};
