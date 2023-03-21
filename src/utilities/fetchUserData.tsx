import { FaExclamationTriangle } from 'react-icons/fa';

export const fetchUserData = async (
    token: string,
    setUserData: (data: any) => void,
    setInfo: (info: { message: string; icon?: JSX.Element }) => void
) => {
    try {
        const serverURL = import.meta.env.VITE_SERVER_URL;
        const res = await fetch(`${serverURL}/api/v1/userdata`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (res.ok) {
            const data = await res.json();
            setUserData(data.user);
        } else {
            const data = await res.json();
            const errorMessage = data.error.message;

            setInfo({
                message: errorMessage,
                icon: <FaExclamationTriangle />,
            });
        }
    } catch (err: unknown) {
        setInfo({
            message: 'Unable to fetch userdata!',
            icon: <FaExclamationTriangle />,
        });
    }
};
