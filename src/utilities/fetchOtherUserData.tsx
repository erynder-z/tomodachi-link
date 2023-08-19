import { InfoType } from '../types/infoType';
import { handleFetchErrors } from './handleFetchErrors';

export const fetchOtherUserData = async (
    id: string | undefined,
    token: string,
    setInfo: (info: InfoType | null) => void
) => {
    try {
        const serverURL = import.meta.env.VITE_SERVER_URL;
        const response = await fetch(`${serverURL}/api/v1/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            const data = await response.json();
            return {
                pageData: data.user,
                isFriend: data.isFriend,
                isIncomingFriendRequestPending:
                    data.isIncomingFriendRequestPending,
                isOutgoingFriendRequestPending:
                    data.isOutgoingFriendRequestPending,
            };
        } else {
            handleFetchErrors(response, setInfo);
        }
    } catch (err: unknown) {
        setInfo({
            typeOfInfo: 'bad',
            message: 'Unable to fetch userdata!',
            icon: '👻',
        });
    }
};
