import { MinimalUserTypes } from '../../../../../types/otherUserTypes';
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

    const indicatorColor = isOnline ? 'bg-green-500' : 'bg-neutral-500';
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
            className="flex items-center gap-4 py-2 text-regularText dark:text-regularTextDark hover:text-highlight dark:hover:text-highlightDark duration-300 cursor-pointer"
        >
            <div className="relative">
                <img
                    loading="lazy"
                    className="w-6 md:w-8 h-auto object-cover rounded-full"
                    src={`data:image/png;base64,${userpic?.data}`}
                    alt="User avatar"
                />
                <div className="group absolute -bottom-1 -right-1 flex h-3 w-3">
                    <div
                        className={`w-3 h-3 rounded-full ${indicatorColor}`}
                    ></div>
                </div>
            </div>
            <div className="flex-1 truncate">
                {firstName} {lastName}
            </div>
        </div>
    );
}
