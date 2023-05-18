import React from 'react';
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
    return (
        <div className="flex justify-around items-center ">
            <button
                onClick={handleShowCommentsClick}
                className="flex justify-center items-center gap-1"
            >
                <MdOutlineModeComment /> {numberOfComments}
            </button>
            <button
                onClick={handlePositiveReactionClick}
                className="flex justify-center items-center gap-1"
            >
                <MdThumbUpOffAlt /> {numberOfPositiveReactions}
            </button>
            <button
                onClick={handleNegativeReactionClick}
                className="flex justify-center items-center gap-1"
            >
                <MdThumbDownOffAlt /> {numberOfNegativeReactions}
            </button>
        </div>
    );
}
