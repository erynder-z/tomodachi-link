import { useState } from 'react';
import {
    MdThumbUpOffAlt,
    MdThumbDownOffAlt,
    MdOutlineModeComment,
} from 'react-icons/md';

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
        <button
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
    );

    const PositiveReactionButton = (
        <button
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
    );

    const NegativeReactionButton = (
        <button
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
    );

    return (
        <div className="flex justify-around items-center">
            {CommentButton}
            {PositiveReactionButton}
            {NegativeReactionButton}
        </div>
    );
}
