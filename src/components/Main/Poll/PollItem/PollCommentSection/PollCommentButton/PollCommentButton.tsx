import { useState } from 'react';
import { MdOutlineModeComment } from 'react-icons/md';

type PollCommentButtonProps = {
    handleShowCommentsClick: () => void;
    numberOfComments: number | undefined;
};

export default function PollCommentButton({
    handleShowCommentsClick,
    numberOfComments,
}: PollCommentButtonProps) {
    const [animateReaction, setAnimateReaction] = useState('');

    const handleReactionClick = (
        reactionType: string,
        callback: () => void
    ) => {
        setAnimateReaction(reactionType);
        callback();
    };

    const handleAnimationEnd = () => setAnimateReaction('');

    return (
        <button
            onClick={() =>
                handleReactionClick('comments', handleShowCommentsClick)
            }
            className={`flex items-center gap-2 hover:text-highlight dark:hover:text-highlightDark origin-left hover:scale-110 transition-all ${
                animateReaction === 'comments'
                    ? 'animate-postReactionAnimation'
                    : ''
            }`}
            onAnimationEnd={handleAnimationEnd}
        >
            <MdOutlineModeComment size="1.5em" /> {numberOfComments}
        </button>
    );
}
