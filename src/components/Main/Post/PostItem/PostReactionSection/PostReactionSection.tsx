import { useState } from 'react';
import {
    MdThumbUpOffAlt,
    MdThumbDownOffAlt,
    MdOutlineModeComment,
} from 'react-icons/md';
import { Tooltip } from 'react-tooltip';

type PostReactionSectionProps = {
    handleShowCommentsClick: () => void;
    numberOfComments: number | undefined;
    handlePositiveReactionClick: () => void;
    numberOfPositiveReactions: number | undefined;
    handleNegativeReactionClick: () => void;
    numberOfNegativeReactions: number | undefined;
};

/**
 * Represents a component for displaying reaction buttons (like, dislike, comment) for a post.
 *
 * @component
 * @param {PostReactionSectionProps} props - The component properties.
 * @returns {JSX.Element} The rendered PostReactionSection component.
 */
export default function PostReactionSection({
    handleShowCommentsClick,
    numberOfComments,
    handlePositiveReactionClick,
    numberOfPositiveReactions,
    handleNegativeReactionClick,
    numberOfNegativeReactions,
}: PostReactionSectionProps): JSX.Element {
    const [animateReaction, setAnimateReaction] = useState('');

    /**
     * Handles a reaction button click.
     *
     * @function
     * @param {string} reactionType - The type of reaction ('comments', 'positive', 'negative').
     * @param {() => void} callback - The callback function to be executed on button click.
     * @returns {void}
     */
    const handleReactionClick = (
        reactionType: string,
        callback: () => void
    ): void => {
        setAnimateReaction(reactionType);
        callback();
    };

    /**
     * Handles the end of the reaction animation by resetting the animation state.
     *
     * @function
     */
    const handleAnimationEnd = () => setAnimateReaction('');

    /**
     * JSX Element representing the comment button.
     * @type {JSX.Element}
     */
    const CommentButton: JSX.Element = (
        <>
            <button
                data-tooltip-id="post-comment-tooltip"
                data-tooltip-content="Toggle comment section"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
                onClick={() =>
                    handleReactionClick('comments', handleShowCommentsClick)
                }
                className={`flex justify-center items-center gap-1  hover:text-highlight dark:hover:text-highlightDark transition-all ${
                    animateReaction === 'comments'
                        ? 'animate-postReactionAnimation'
                        : 'hover:animate-squish'
                }`}
                onAnimationEnd={handleAnimationEnd}
            >
                <MdOutlineModeComment /> {numberOfComments}
            </button>
            <Tooltip
                id="post-comment-tooltip"
                style={{ fontSize: '0.75rem' }}
            />
        </>
    );

    /**
     * JSX Element representing the positive reaction (like) button.
     * @type {JSX.Element}
     */
    const PositiveReactionButton: JSX.Element = (
        <>
            <button
                data-tooltip-id="post-like-tooltip"
                data-tooltip-content="Like"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
                onClick={() =>
                    handleReactionClick('positive', handlePositiveReactionClick)
                }
                className={`flex justify-center items-center gap-1 hover:text-highlight dark:hover:text-highlightDark  transition-all ${
                    animateReaction === 'positive'
                        ? 'animate-postReactionAnimation'
                        : 'hover:animate-squish'
                }`}
                onAnimationEnd={handleAnimationEnd}
            >
                <MdThumbUpOffAlt /> {numberOfPositiveReactions}
            </button>
            <Tooltip id="post-like-tooltip" style={{ fontSize: '0.75rem' }} />
        </>
    );

    /**
     * JSX Element representing the negative reaction (dislike) button.
     * @type {JSX.Element}
     */
    const NegativeReactionButton: JSX.Element = (
        <>
            <button
                data-tooltip-id="post-dislike-tooltip"
                data-tooltip-content="Dislike"
                data-tooltip-variant="dark"
                data-tooltip-delay-show={500}
                onClick={() =>
                    handleReactionClick('negative', handleNegativeReactionClick)
                }
                className={`flex justify-center items-center gap-1 hover:text-highlight dark:hover:text-highlightDark transition-all ${
                    animateReaction === 'negative'
                        ? 'animate-postReactionAnimation'
                        : 'hover:animate-squish'
                }`}
                onAnimationEnd={handleAnimationEnd}
            >
                <MdThumbDownOffAlt /> {numberOfNegativeReactions}
            </button>
            <Tooltip
                id="post-dislike-tooltip"
                style={{ fontSize: '0.75rem' }}
            />
        </>
    );

    /**
     * The rendered PostReactionSection component.
     *
     * @type {JSX.Element}
     */
    return (
        <div className="flex justify-around items-center">
            {CommentButton}
            {PositiveReactionButton}
            {NegativeReactionButton}
        </div>
    );
}
