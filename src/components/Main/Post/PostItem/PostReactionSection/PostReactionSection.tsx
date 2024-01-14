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

export default function PostReactionSection({
    handleShowCommentsClick,
    numberOfComments,
    handlePositiveReactionClick,
    numberOfPositiveReactions,
    handleNegativeReactionClick,
    numberOfNegativeReactions,
}: PostReactionSectionProps) {
    const [animateReaction, setAnimateReaction] = useState('');

    const handleReactionClick = (
        reactionType: string,
        callback: () => void
    ) => {
        setAnimateReaction(reactionType);
        callback();
    };

    const handleAnimationEnd = () => setAnimateReaction('');

    const CommentButton = (
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

    const PositiveReactionButton = (
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

    const NegativeReactionButton = (
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

    return (
        <div className="flex justify-around items-center">
            {CommentButton}
            {PositiveReactionButton}
            {NegativeReactionButton}
        </div>
    );
}
