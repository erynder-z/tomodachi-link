import { useState } from 'react';
import { MdOutlineModeComment } from 'react-icons/md';
import { Tooltip } from 'react-tooltip';
import useTheme from '../../../../../../hooks/useTheme';

type PollCommentButtonProps = {
    handleShowCommentsClick: () => void;
    numberOfComments: number | undefined;
};

/**
 * React component for rendering a button to show the comment section of a poll.
 *
 * @component
 * @param {PollCommentButton} props - The component props.
 * @param {Function} props.handleShowCommentsClick - Callback function to handle the click event for showing comments.
 * @param {number|undefined} props.numberOfComments - The number of comments, or undefined if not available.
 * @returns {JSX.Element} - Rendered PollCommentButton component.
 */
export default function PollCommentButton({
    handleShowCommentsClick,
    numberOfComments,
}: PollCommentButtonProps): JSX.Element {
    const { isMobileDevice } = useTheme();
    const [animateReaction, setAnimateReaction] = useState('');

    /**
     * Handles the click event for a reaction button.
     *
     * @param {string} reactionType - The type of reaction (e.g., 'comments').
     * @param {Function} callback - The callback function to execute after setting the animation state.
     * @returns {void}
     */
    const handleReactionClick = (
        reactionType: string,
        callback: () => void
    ): void => {
        setAnimateReaction(reactionType);
        callback();
    };

    const handleAnimationEnd = () => setAnimateReaction('');

    /**
     * The rendered PollCommentButton component.
     *
     * @type {JSX.Element}
     */
    return (
        <>
            <button
                data-tooltip-id="poll-comments-tooltip"
                data-tooltip-content="Show comment section"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
                data-tooltip-hidden={isMobileDevice}
                onClick={() =>
                    handleReactionClick('comments', handleShowCommentsClick)
                }
                className={`w-fit flex items-center gap-2 hover:text-highlight dark:hover:text-highlightDark origin-left hover:scale-110 transition-all ${
                    animateReaction === 'comments'
                        ? 'animate-postReactionAnimation'
                        : ''
                }`}
                onAnimationEnd={handleAnimationEnd}
            >
                <MdOutlineModeComment size="1.5em" /> {numberOfComments}
            </button>
            <Tooltip
                id="poll-comments-tooltip"
                style={{ fontSize: '0.75rem' }}
            />
        </>
    );
}
