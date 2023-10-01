import { Comment } from 'react-loader-spinner';

type TypingIndicatorProps = {
    isTyping: boolean;
};

export default function TypingIndicator({ isTyping }: TypingIndicatorProps) {
    return (
        <div className="flex justify-end h-4 w-full mt-8 px-4 text-gray-400">
            {isTyping && (
                <Comment
                    visible={true}
                    height="40"
                    width="40"
                    ariaLabel="comment-loading"
                    color="#00000"
                    backgroundColor="#CDDCEE"
                />
            )}
        </div>
    );
}
