import React, { useState } from 'react';
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

    const handleAnimationEnd = () => {
        setAnimateReaction('');
    };

    return (
        <div className="flex justify-around items-center">
            <button
                onClick={() =>
                    handleReactionClick('comments', handleShowCommentsClick)
                }
                className={`flex justify-center items-center gap-1 hover:text-highlight dark:hover:text-highlightDark hover:scale-110 transition-all ${
                    animateReaction === 'comments'
                        ? 'animate-popInAnimation'
                        : ''
                }`}
                onAnimationEnd={handleAnimationEnd}
            >
                <MdOutlineModeComment /> {numberOfComments}
            </button>
            <button
                onClick={() =>
                    handleReactionClick('positive', handlePositiveReactionClick)
                }
                className={`flex justify-center items-center gap-1 hover:text-highlight dark:hover:text-highlightDark hover:scale-110 transition-all ${
                    animateReaction === 'positive'
                        ? 'animate-popInAnimation'
                        : ''
                }`}
                onAnimationEnd={handleAnimationEnd}
            >
                <MdThumbUpOffAlt /> {numberOfPositiveReactions}
            </button>
            <button
                onClick={() =>
                    handleReactionClick('negative', handleNegativeReactionClick)
                }
                className={`flex justify-center items-center gap-1 hover:text-highlight dark:hover:text-highlightDark hover:scale-110 transition-all ${
                    animateReaction === 'negative'
                        ? 'animate-popInAnimation'
                        : ''
                }`}
                onAnimationEnd={handleAnimationEnd}
            >
                <MdThumbDownOffAlt /> {numberOfNegativeReactions}
            </button>
        </div>
    );
}
