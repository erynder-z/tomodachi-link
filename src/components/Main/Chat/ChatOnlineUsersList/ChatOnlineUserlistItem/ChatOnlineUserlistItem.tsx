import { MinimalUserTypes } from '../../../../../types/otherUserTypes';
import { getCorrectUserpicFormat } from '../../../../../utilities/getCorrectUserpicFormat';
import useAuth from '../../../../../hooks/useAuth';
import useInfoCard from '../../../../../hooks/useInfoCard';
import { ChatConversationType } from '../../../../../types/chatTypes';
import { handleInitializeChat } from '../../../../../utilities/handleInitializeChat';

type ChatOnlineUserlistItemProps = {
    listItemData: MinimalUserTypes;
    isOnline: boolean;
    setActiveChat: (chat: ChatConversationType) => void;
};

export default function ChatOnlineUserlistItem({
    listItemData,
    isOnline,
    setActiveChat,
}: ChatOnlineUserlistItemProps) {
    const { token } = useAuth();
    const { setInfo } = useInfoCard();
    const { _id, firstName, lastName, userpic } = listItemData || {};

    const indicatorColor = isOnline ? 'green' : 'gray';
    const chatPartnerId = _id;

    return (
        <div
            onClick={() => {
                handleInitializeChat(
                    token,
                    setInfo,
                    chatPartnerId,
                    setActiveChat
                );
            }}
            className="flex items-center w-full gap-4 py-2 text-regularText dark:text-regularTextDark hover:text-highlight dark:hover:text-highlightDark duration-300  cursor-pointer"
        >
            <div
                className={`w-3 h-3 rounded-full bg-${indicatorColor}-500`}
            ></div>
            <img
                loading="lazy"
                className="w-8 h-8 object-cover rounded-full"
                src={`data:image/png;base64,${getCorrectUserpicFormat(
                    userpic
                )}`}
                alt="User avatar"
            />
            <div className="overflow-hidden whitespace-nowrap text-ellipsis">
                {firstName} {lastName}
            </div>
        </div>
    );
}
