/**
 * Asynchronously handles adding a default friend using the provided token.
 *
 * @param {string} token - The token used for authorization
 * @return {Promise<void>} Promise that resolves when the default friend is added
 */
export const handleAddDefaultFriend = async (token: string): Promise<void> => {
    try {
        const SERVER_URL = import.meta.env.VITE_SERVER_URL;
        await fetch(`${SERVER_URL}/api/v1/defaultfriend`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (err: unknown) {
        console.error(err);
    }
};
