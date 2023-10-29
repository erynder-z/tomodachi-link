import { MdMoreTime } from 'react-icons/md';

type GetOlderMessagesButtonProps = {
    handleFetchChatMessages: (messageScope?: 'all' | 'latest') => Promise<void>;
    isSubmitting: boolean;
};

export default function GetOlderMessagesButton({
    handleFetchChatMessages,
    isSubmitting,
}: GetOlderMessagesButtonProps) {
    return (
        <div className="text-regularText dark:text-regularTextDark flex justify-center items-center mb-4">
            <button
                disabled={isSubmitting}
                onClick={() => {
                    handleFetchChatMessages('all');
                }}
                className="flex justify-center items-center gap-2 cursor-pointer px-2 py-1 rounded-full bg-gray-300/80 dark:bg-gray-500/80"
            >
                {isSubmitting ? (
                    <>
                        <span className="text-xs">Getting messages</span>
                        <div className="border-gray-300/80 h-2 w-2 animate-spin rounded-full border-8 border-t-highlight dark:border-t-highlightDark" />
                    </>
                ) : (
                    <>
                        <span className="text-xs">fetch older messages</span>
                        <MdMoreTime />
                    </>
                )}
            </button>
        </div>
    );
}
