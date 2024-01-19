import { Comment } from 'react-loader-spinner';

type TypingIndicatorProps = {
    isTyping: boolean;
};

/**
 * TypingIndicator component for displaying a visual indication when a user is typing.
 *
 * @component
 * @param {TypingIndicatorProps} props - The props object.
 * @param {boolean} props.isTyping - Indicates whether the user is currently typing.
 * @returns {JSX.Element} The rendered TypingIndicator component.
 */
export default function TypingIndicator({ isTyping }: TypingIndicatorProps) {
    /**
     * JSX content for the TypingIndicator component.
     * @type {JSX.Element}
     */
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
