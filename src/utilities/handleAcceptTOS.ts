export const handleAcceptTOS = async (token: string): Promise<void> => {
    try {
        const SERVER_URL = import.meta.env.VITE_SERVER_URL;
        await fetch(`${SERVER_URL}/api/v1/tos/accept`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (err: unknown) {
        console.error(err);
    }
};
