import { MinimalUserTypes } from '../../../../../types/otherUserTypes';
import useAuth from '../../../../../hooks/useAuth';
import useInfoCard from '../../../../../hooks/useInfoCard';
import { ChatConversationType } from '../../../../../types/chatTypes';
import { handleInitializeChat } from '../../../../../utilities/handleInitializeChat';
import { Tooltip } from 'react-tooltip';
import useTheme from '../../../../../hooks/useTheme';

type ChatOnlineUserlistItemProps = {
    listItemData: MinimalUserTypes;
    isOnline: boolean;
    setActiveChat: (chat: ChatConversationType) => void;
};

/**
 * ChatOnlineUserlistItem component for displaying an item in the online user list.
 *
 * @component
 * @param {ChatOnlineUserlistItemProps} props - The props object.
 * @param {MinimalUserTypes} props.listItemData - Data for the user displayed in the online user list.
 * @param {boolean} props.isOnline - Indicates whether the user is currently online.
 * @param {(chat: ChatConversationType) => void} props.setActiveChat - Function to set the active chat when starting a conversation.
 * @returns {JSX.Element} The rendered ChatOnlineUserlistItem component.
 */
export default function ChatOnlineUserlistItem({
    listItemData,
    isOnline,
    setActiveChat,
}: ChatOnlineUserlistItemProps): JSX.Element {
    const { token } = useAuth();
    const { setInfo } = useInfoCard();
    const { isMobileDevice } = useTheme();
    const { _id, firstName, lastName, userpic } = listItemData || {};

    const indicatorColor = isOnline ? 'bg-green-500' : 'bg-neutral-500';
    const chatPartnerId = _id;

    /**
     * Renders the ChatOnlineUserlistItem based on the loading state.
     *
     * @return {JSX.Element} The rendered ChatOnlineUserlistItem component.
     */
    return (
        <>
            <div
                data-tooltip-id="chat-online-user-tooltip"
                data-tooltip-content="Start chat"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
                data-tooltip-hidden={isMobileDevice}
                onClick={() => {
                    handleInitializeChat(
                        token,
                        setInfo,
                        chatPartnerId,
                        setActiveChat
                    );
                }}
                className="flex items-center gap-2 py-2 text-sm text-regularText dark:text-regularTextDark hover:text-highlight dark:hover:text-highlightDark duration-300 cursor-pointer"
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
            <Tooltip
                id="chat-online-user-tooltip"
                style={{ fontSize: '0.75rem', zIndex: 99 }}
            />
        </>
    );
}
