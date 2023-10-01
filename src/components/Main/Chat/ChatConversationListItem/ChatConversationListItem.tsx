import { MinimalUserTypes } from '../../../../types/minimalUserTypes';
import { getCorrectUserpicFormat } from '../../../../utilities/getCorrectUserpicFormat';

type ChatConversationListItemProps = {
    listItemData: MinimalUserTypes | null;
};

export default function ChatConversationListItem({
    listItemData,
}: ChatConversationListItemProps) {
    const { firstName, lastName, userpic } = listItemData || {};

    const LoadingContent = (
        <div className="w-full flex items-center gap-2">
            <div className="w-8 h-8 object-cover rounded-full  bg-gray-600/50 animate-pulse"></div>
            <div className="hidden md:block bg-gray-600/50 animate-pulse h-4 w-1/2"></div>
        </div>
    );

    const ChatConversationListItemContent = (
        <div className="w-full flex gap-2">
            <img
                loading="lazy"
                className="w-8 h-8 object-cover rounded-full"
                src={`data:image/png;base64,${getCorrectUserpicFormat(
                    userpic
                )}`}
                alt="User avatar"
            />
            <div className="hidden md:block overflow-hidden whitespace-nowrap text-ellipsis">
                {firstName} {lastName}
            </div>
        </div>
    );

    return !listItemData ? LoadingContent : ChatConversationListItemContent;
}
