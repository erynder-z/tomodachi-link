import { InfoType } from '../types/infoType';
import { PostType } from '../types/postType';
import { handleFetchErrors } from './handleFetchErrors';
import { FaExclamationTriangle } from 'react-icons/fa';

export const fetchPostContent = async (
    token: string,
    id: string | undefined,
    setPostDetails: React.Dispatch<React.SetStateAction<PostType | null>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setInfo: (info: InfoType | null) => void
) => {
    try {
        const serverURL = import.meta.env.VITE_SERVER_URL;
        const response = await fetch(`${serverURL}/api/v1/post/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            const data = await response.json();
            setPostDetails(data.retrievedPost);
        } else {
            handleFetchErrors(response, setInfo);
        }
    } catch (err: unknown) {
        setInfo({
            message: 'Unable to fetch posts!',
            icon: <FaExclamationTriangle />,
        });
    }
    if (setLoading) {
        setLoading(false);
    }
};
